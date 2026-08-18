#!/usr/bin/env python3
"""
Busca calendários iCal do Airbnb/Booking.com e gera disponibilidade.json.
Configurar os secrets AIRBNB_ICAL_URL e BOOKING_ICAL_URL no repositório.
"""
import json
import os
import re
import urllib.request
from datetime import datetime, timedelta


def unfold(content):
    """Remove folding de linhas do formato iCal (RFC 5545)"""
    return re.sub(r'\r?\n[ \t]', '', content)


def parse_date(value):
    """Converte DTSTART/DTEND para objeto date (ignora horário e timezone)"""
    return datetime.strptime(value.strip()[:8], '%Y%m%d').date()


def parse_events(content):
    """Retorna lista de {inicio, fim} com todos os períodos bloqueados"""
    content = unfold(content)
    events = []
    for block in re.finditer(r'BEGIN:VEVENT(.*?)END:VEVENT', content, re.DOTALL):
        b = block.group(1)
        m_start = re.search(r'^DTSTART[^:]*:(.+)$', b, re.MULTILINE)
        m_end   = re.search(r'^DTEND[^:]*:(.+)$',   b, re.MULTILINE)
        if not m_start or not m_end:
            continue
        try:
            dtstart = parse_date(m_start.group(1))
            dtend   = parse_date(m_end.group(1))
        except ValueError:
            continue
        # No iCal, DTEND de evento de dia inteiro é exclusivo
        # Exemplo: check-in 15/06, check-out 18/06 → dtend=18/06
        # O dia 18 fica livre para um novo hóspede → fim bloqueado = 17/06
        last = dtend - timedelta(days=1)
        if last >= dtstart:
            events.append({'inicio': dtstart.isoformat(), 'fim': last.isoformat()})
    return events


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'SoraBubble-Calendar/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode('utf-8', errors='replace')


def main():
    sources = [
        ('Airbnb',  os.environ.get('AIRBNB_ICAL_URL',  '')),
        ('Booking', os.environ.get('BOOKING_ICAL_URL', '')),
    ]

    all_events = []
    for name, url in sources:
        if not url:
            print(f'[{name}] URL não configurada, pulando.')
            continue
        try:
            print(f'[{name}] Buscando calendário…')
            events = parse_events(fetch(url))
            all_events.extend(events)
            print(f'[{name}] {len(events)} período(s) bloqueado(s).')
        except Exception as e:
            print(f'[{name}] Erro: {e}')

    all_events.sort(key=lambda x: x['inicio'])

    data = {
        'atualizado': datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
        'bloqueados': all_events,
    }

    with open('disponibilidade.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    print(f'Salvo disponibilidade.json — {len(all_events)} período(s) no total.')


if __name__ == '__main__':
    main()

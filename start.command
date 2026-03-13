#!/bin/bash
cd "$(dirname "$0")"
PORT=8080
echo "PMAS — запуск на http://localhost:$PORT"
echo "Для остановки нажмите Ctrl+C"
open "http://localhost:$PORT"
python3 -m http.server $PORT

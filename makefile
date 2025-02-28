run:
	docker compose up --build -d
	sh ./backend/init.sh
DC=docker-compose
DC_EXEC=$(DC) exec
FRONTEND=$(DC_EXEC) cascadia-calculator
NPM=$(FRONTEND) npm run

start:
	$(DC) up -d

stop:
	$(DC) stop

ssh:
	$(FRONTEND) sh

install:
	$(FRONTEND) npm install

dev:
	$(NPM) dev

start-dev:
	$(DC) up -d && $(NPM) dev

build:
	$(NPM) build
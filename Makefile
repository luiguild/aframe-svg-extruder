build: node_modules
	yarn build

publish: build
	./npm.sh

deploy: build
	./deploy.sh

all: build publish deploy
	git checkout develop
	git add .
	git commit -m "published in every part of the world"
	git push

clean:
	rm -rf dist

init:
	yarn

node_modules: package.json
	yarn

.PHONY: build

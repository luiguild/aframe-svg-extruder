build: node_modules
	yarn build

publish: build
	./npm.sh

clean:
	rm -rf dist

init:
	yarn

node_modules: package.json
	yarn

.PHONY: build

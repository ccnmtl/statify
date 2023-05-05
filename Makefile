STAGING_URL=https://statify.ctl.columbia.edu/
PROD_URL=https://statify.ctl.columbia.edu/
STAGING_BUCKET=statify.stage.ctl.columbia.edu
PROD_BUCKET=statify.ctl.columbia.edu
INTERMEDIATE_STEPS ?= echo nothing
NODE_MODULES ?= ./node_modules
DIST ?= dist
JS_SENTINAL ?= $(NODE_MODULES)/sentinal

include *.mk

$(JS_SENTINAL): package.json
	rm -rf $(NODE_MODULES)
	npm install
	touch $(JS_SENTINAL)

install:
	touch package.json 
	make $(JS_SENTINAL)

clean:
	rm -rf $(NODE_MODULES) $(DIST) 

.PHONY: clean install
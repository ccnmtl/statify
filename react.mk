S3CMD ?= s3cmd
S3_FLAGS ?= --acl-public --delete-removed --no-progress --no-mime-magic --guess-mime-type
INTERMEDIATE_STEPS = cp src/images/* dist/images/.
DIST_CLEAN = rm -rf dist

all: test js-typecheck

runserver: $(JS_SENTINAL)
	-cp src/images/* dist/images/.
	npm run dev

build: $(JS_SENTINAL)
	npm run build:prod && \
	$(INTERMEDIATE_STEPS)

dev: $(JS_SENTINAL)
	npm run dev 

eslint: $(JS_SENTINAL)
	npm run eslint

js-typecheck: $(JS_SENTINAL)
	npm run typecheck
.PHONY: js-typecheck

test: $(JS_SENTINAL) eslint
	npm test
	npm run cypress:test

cypress:
	npm run cypress:open

deploy-stage: $(JS_SENTINAL) 
	$(DIST_CLEAN) \
	&& npm run build:prod \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(STAGING_BUCKET)/

deploy-prod: $(JS_SENTINAL) 
	$(DIST_CLEAN) \
	&& npm run build:prod \
	&& $(INTERMEDIATE_STEPS) \
	&& $(S3CMD) $(S3_FLAGS) sync --exclude-from='.s3ignore' . s3://$(PROD_BUCKET)/

.PHONY: runserver build dev eslint test cypress deploy-stage deploy-prod
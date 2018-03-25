help:
	@echo "tasks available:"
	@echo "  help    - display this help"
	@echo "  build   - build assets before publishing"

build:
	@docs/src/build.sh

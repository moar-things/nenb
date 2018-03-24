#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR=$SCRIPT_DIR/../..

NEND="node $BASE_DIR/lib/cli"

FILES=`find $BASE_DIR/docs/examples/src | grep '\.nenb\.md$' | xargs`
$NEND $FILES
cp $BASE_DIR/docs/examples/src/*.nenb.html $BASE_DIR/docs/examples
rm $BASE_DIR/docs/examples/src/*.nenb.html

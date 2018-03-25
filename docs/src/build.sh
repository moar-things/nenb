#!/usr/bin/env bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BASE_DIR=$SCRIPT_DIR/../..

NEND="node $BASE_DIR/lib/cli"

cd $BASE_DIR

$NEND docs/src/*.nenb.md          --output docs
$NEND docs/src/examples/*.nenb.md --output docs/examples

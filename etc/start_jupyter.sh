#!/usr/bin/env bash

NB_DIR="../";

jupyter notebook --ip="0.0.0.0" --no-browser --notebook-dir="${NB_DIR}" --config="$(pwd)/jupyter_notebook_config.py"

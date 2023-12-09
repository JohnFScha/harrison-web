#!/git/bash

args=("$@")

git add .
git commit -m "$args"
git push -u origin main
#!/bin/bash

source VERSION

function join_by {
	local IFS="$1";
	shift; echo "$*";
}

# Find vue env vars
vars=$(env | grep VITE_ | awk -F = '{print "$"$1}')
vars=$(join_by ' ' $vars)
echo "Found variables $vars"

for file in /usr/share/nginx/html/assets/*.js /usr/share/nginx/html/index.html;
do
  echo "Processing $file ...";

  # Use the existing JS file as template
  cp $file $file.tmpl
  envsubst "$vars" < $file.tmpl > $file
  #rm $file.tmpl
done

exec "$@"

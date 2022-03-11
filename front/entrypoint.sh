#!/bin/bash

# # react build

npm install
if [ $DEV -eq 1 ]
then
  npm run dev
else
  npm run build
  npm run start
fi
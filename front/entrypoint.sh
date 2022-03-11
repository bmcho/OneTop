#!/bin/bash

# # react build
if [ $DEV -eq 1 ]
then
  npm install
  npm run dev
else
  npm run start
fi
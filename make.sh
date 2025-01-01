#!/bin/bash

zip_file=chaosBP.mcpack
source_folder=.

if [-f $zip_file]; then rm $zip_file; fi

7z a $zip_file $source_folder\* -xr!.git* -xr!node_modules -xr!make*
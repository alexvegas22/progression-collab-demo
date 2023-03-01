#!/bin/bash

VERFILE=$(dirname "${BASH_SOURCE[0]}")/VERSION

VERSION_API=$(curl $VITE_API_URL|cut -d " " -f 2)
VERSION_FE=$(cat $VERFILE|cut -d "=" -f 2)

echo "Version API: $VERSION_API"
echo "Version App: $VERSION_FE"

VERSION_API_MAJ=$(echo $VERSION_API|cut -d "." -f 1)
VERSION_FE_MAJ=$(echo $VERSION_FE|cut -d "." -f 1)

VERSION_API_MIN=$(echo $VERSION_API|cut -d "." -f 2)
VERSION_FE_MIN=$(echo $VERSION_FE|cut -d "." -f 2)

# Vérifie que la révision majeure est la même
if [ $VERSION_API_MAJ -ne $VERSION_FE_MAJ ]
then
	echo "ERREUR: La révision majeure de l'API doit être égale à $VERSION_FE_MAJ"
	exit 1
fi

# Vérifie la révision mineure
if ! dpkg --compare-versions "$VERSION_API_MAJ.$VERSION_API_MIN" "ge" "$VERSION_FE_MAJ.$VERSION_FE_MIN"
then
	echo "ERREUR: La version MAJ.MIN de l'API doit être égale ou supérieure à $VERSION_FE_MAJ.$VERSION_FE_MIN"
	exit 2
fi

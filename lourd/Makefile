# Cible par défaut : docker-compose up --build
all:
	terminator -e "docker-compose up --build"
	(while ! docker ps | grep -q "6 seconds ago" ; do sleep 3; done)
	npx prisma migrate dev --schema=./src/prisma/schema.prisma

#terminator -e "watch docker ps"
# Nettoyer le projet : docker-compose down --rmi all --volumes --remove-orphans

fclean:
	docker-compose down --rmi all --volumes --remove-orphans

#Lancer le docker-compose
run:
	docker-compose up --build

# Exécuter npx prisma migrate : schema=./src/prisma/schema.prisma
migrate:
	npx prisma migrate dev --schema=./src/prisma/schema.prisma

# Ouvrir Prisma Studio
studio:
	npx prisma studio --schema=./src/prisma/schema.prisma

# Relancer le projet
re: fclean all

# Ouvrir Terminator avec make
terminator:
	terminator -e "make"

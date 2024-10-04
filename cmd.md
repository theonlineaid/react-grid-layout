# Docker command for run project

```
docker build -t docker-react .
docker run -it -v .:/app -p 3000:5173 docker-react
docker-compose up react-app-dev
docker-compose up --build react-app-dev
docker-compose build --no-cache
docker-compose build react-app-dev
docker-compose up react-app-dev
docker-compose down --rmi all --volumes --remove-orphans

```

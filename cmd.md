docker build -t docker-react .
docker run -it -v .:/app -p 3000:5173 docker-react
docker-compose up react-app-dev
docker-compose up --build react-app-dev
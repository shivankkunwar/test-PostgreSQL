# Simple Node App POSTGRESQL based Backend

## Docker config 
- run the docker `docker run --name my-postgres1 -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
- execute PSQL `docker exec -it my-postgres1 psql -U postgres -d postgres`
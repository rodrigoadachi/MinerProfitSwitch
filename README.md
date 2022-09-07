//cat /etc/os-release

sudo apt install git curl
sudo apt update
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
exec bash
bash --login
nvm install node
nvm install --lts

curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt-get update
sudo apt-get install yarn

yarn global add pm2
pm2 startup
pm2 save



// token Kaka

eyJhbGciOiJIUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3MTEwZTIyMi02ZGM2LTQ4MmYtOGE1OS0wOTcwYmQ2NjdkZGQifQ.eyJleHAiOjE5Nzc2NjEyMzc4OTEsIm5iZiI6MTY2MjA0MjAzNzg5MSwiaWF0IjoxNjYyMDQyMDM3ODkxLCJqdGkiOiIxMGEyNDc3ZC05NTU2LTRmM2ItOWM5Yi1hNGFkOGU5ZmFjYWMiLCJzdWIiOiIxMGEyNDc3ZC05NTU2LTRmM2ItOWM5Yi1hNGFkOGU5ZmFjYWMifQ.Gf3vLa7lClFsVNba0isQl3CpPO_xgfln9P3vb9EAvyY
MathPedia Prototype
========


Getting started
-------------

### Docker 설치

Mac에서 [Docker](https://store.docker.com/editions/community/docker-ce-desktop-mac)를 설치

### 공유 데이터 폴더 생성 및 권한 설정

```
cd /
mkdir data
chown 사용자계정명:staff /data
```
docker preferences(맥 상단 상태바의 도커 아이콘 오른쪽 클릭) 창 열어서 File Sharing 에 /data 폴더 추가

### Node.js 설치

[n](https://github.com/tj/n)을 통해서 node.js 설치

```
curl -L https://git.io/n-install | bash
```

### Yarn 설치
```
brew install yarn
```

### Docker container 실행

소스를 받은 위치에서 다음을 실행

```
docker-compose up -d --build
```

### Server 실행

```
cd server
yarn
npm run dev
```

### Front Dev Server 실행

```
cd front
yarn
npm run nuxt
```

### Client Dev Server 실행

```
cd client
yarn
npm run dev
```

Test
-------------

### Server

```
cd server
npm run test
```

### Client

```
cd client

// Unit + E2E
npm run test

// Unit
npm run unit

// E2E
npm run e2e
```

Coding Convention
-------------

### JavaScrypt Style Guide
* Airbnb의 [JavaScript Style Guide](https://github.com/airbnb/javascript)를 따름

### Lint
* [eslint](https://eslint.org/)

### Git
* [git flow](http://danielkummer.github.io/git-flow-cheatsheet/index.html)

* Commit Rule

  - 분류가 될 수 있는 항목을 대괄호 사이에 넣어서 명시적으로 표시
  - Github issue 번호 표시
  - e.g. ```[server, client][#312] Add feature to provide problems API and UI```
  - e.g. ```[server][#317] Fix bug to prevent long response time```
  


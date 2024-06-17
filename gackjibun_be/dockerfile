#노드 버전 18 사용
FROM node:18

LABEL author="dusehd1 <angrybird2600@gmail.com>"
LABEL description="24-1 객체지향분석및설계 팀프로젝트 - 백엔드"

#작업 디렉토리 설정
WORKDIR /usr/src/app

#종속성 설치
COPY package*.json ./
RUN npm install

#컨테이너에 코드 소스 추가
COPY . .

#포트 노출
EXPOSE 8080

#앱 실행, 실행 시 필요한 명령어
CMD ["npm", "run", "start:server"]
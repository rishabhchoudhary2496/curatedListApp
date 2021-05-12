# curatedListApp

A web app where user can create there curated List and search others as well
It is Built Using Next Js (React Js FrameWork).
Api functionality is implemented using next js api routes

## Guide to run this project in development mode

### Create a .env.local file

<ul>
    <li>DATABASE_URL (mongodb database url)</li>
    <li>MONGO_DB (mongodb database name)</li>
    <li>SENDGRID_API_KEY (sendgrid api key for sending email for sign in)</li>
    <li>SMTP_SERVER (smtp://apikey:<ApiKey>:587)</li>
    <li>EMAIL_FROM (email from configured same in sendgrid account)</li>
    <li>NEXTAUTH_URL (localhost url)</li>
</ul>

<ul>
 <li>Run by using command npm run dev</li>
</ul>

## Guide to run project in production mode

<ul>
    <li>First Run npm build command to make a build</li>
    <li>After build is complete run npm start</li>
</ul>

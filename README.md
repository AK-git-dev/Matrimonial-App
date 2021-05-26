# Matrimonial App Workflow
Last Updated by: Sounish Nath -TCS-1964566_Intern

# UI/UX Utilities

## Bridal Illustations Designs
- [Undraw.co](https://undraw.co/) Spalsh screen setup images and many more.
- [Humaans For Bridal Illustrations](https://blush.design/collections/humaaans) every bridal illustration images.

## Fonts & Iconographics
- Fonts:
    - [Averta Standard Regular](https://fontsfree.net//wp-content/fonts/basic/sans-serif/FontsFree-Net-AvertaStandard-Regular.ttf)

    - [Product Sans Google Font](https://gist.github.com/sounishnath003/e241dac285732cf1eb1633471c20cef7)

- Icons:
    - [Icons8](https://icons8.com/)
    - [Iconsxyz.com](https://iconsvg.xyz/)


## Themes
A **Royal Blued** color with **Lightish Pink** as a accent color.

- Primary Color: ##1114c2
- Accent Color: #ff3d5e
- Or else pls. specify your choice!


<br />

# Coding Standards

## Authentication Modules
- **PHONE_NUMBER_AUTENTICATION:** As we need **authentication via phone number / OTP** in a first priority module to do that we'll be using [Firebase Phone Number Authentication](https://firebase.google.com/docs/auth/web/phone-auth). 

- **SOCIAL_LOGIN_OAUTH:** As next signin/signup feature we have Facebook/Google signin for the same we can rely to use firebase basic Auth feature! [Google/Facebook Signin](https://firebase.google.com/docs/auth/web/google-signin).

## External CSS Library
- **[Tailwind CSS](https://tailwindcss.com/)** a utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.

## Suggested Technology Stack
- [Typescript](https://www.typescriptlang.org/) is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript.

- [Angular](https://angular.io/) to build applications with Angular and reuse your code and abilities to build apps for any deployment target. For web, mobile web, native mobile and native desktop.

- [Ionic Framework - Hybrid app](https://ionicframework.com/) an open source mobile UI toolkit for building high quality, cross-platform native and web app experiences. Move faster with a single code base, running everywhere with JavaScript and the Web.

- [MySQL Database](https://www.mysql.com/) service is a fully managed database service to deploy cloud-native applications. HeatWave, an integrated, high-performance analytics engine 

- [Azure Serverless Computations](https://azure.microsoft.com/en-in/services/functions/) helps to develop more efficiently with Functions, an event-driven serverless compute platform that can also solve complex orchestration problems. Build and debug locally without additional setup, deploy and operate at scale in the cloud and integrate services using triggers and bindings.


## Database Design (MYSQL)
*From Eagle's Eye:* Database Schema Designed.

![Database-Schema-Design](./Backend/database/matrimonialDB.png)

### Database Schemas
- User
    - Fullname
    - DOB 
    - Age (Shadow Entity - Age will automatically calculated) (Indexing)
    - Gender (Male, Female, Prefer Not To Say)
    - PhoneNumbers
    - Email
    - Education (Referential)
    - Matchings (Referential)
    - Verified (Referential)
    - RequestSend (Referential)
    - RequestAccepted (Referential)
    - WhoRejected (Refential)
    - MartialStatus (Indexing)
        - Widowed
        - Marriaged
        - Divorced
        - Separated
        
    - LifeStyle (Referential)
        - Height (Indexing)
        - Weight
        - BloogGroup
        - LanguageCanSpeak (Bengali, Marathi, Tamil...)
        - DressStyle
        - Favorites
            - Books
            - Songs
            - Movies
        - Vaccition Destination (Indexing)
        - Body Type (Slim, Athletic, Blonde, Chubby)
        - Complextion (VeryFair, Fair, Wheatish, Dark)
        - Any Disability
            - True
            - False
            - Description
        - Diet (Veg, Eggterian, Both, Non-veg, Jain, Vegan)
        - Drinking Habbit (No, Regular, Occasional)
        - Smoking Habbit (No, Regular, Occasional)
        - Hobbies (Movies, Books, Travel, Biking, Hiking, Soccer, Cricket, Foods, Blogging, Dance, Theater, Photography, Musics)
        - Sports & Fitness (Badminton, Swimming, Reading, Yoga, Gym)
        - AnyChildern
            - True
            - False
            - 1 / 2 / 3+
        - Date of Marriage
        - Date of Divorced
        - Reason for Divorced
        - If any diseases
    - Mother tongue (Indexing)
    - Caste (Referential) (Indexing)
    - NoCasteBarrier
        - True
        - False
    - Country
    - Father's Name
    - Mother's Name
    - Address
    - City
    - District
    - Education (Indexing)
        - Graduate (B.Tech, M.Tech, ...)
        - Higher Education School Name
    - Occupation (Referential) (Indexing)
        - Type (Developer, Accountant, Manager...)
        - Current Company Name
        - Salary Offered  
        - SelfEmployeed
            - TRUE
            - False  
    - Profile Picture (max 10, Bucket)
    - FavoriteLists (Refertials -> User1 --> User2)
    - DocumentsUploaded (Referential)
        - Score (max. x150)
        - PhotoID
            - Aadhar - (10pts)
            - Driving - (10pts)
            - Passport - (10pts)
            - VoterID - (10pts)
            - Pancard - (10pts)
        - EducationProofs
            - Graduate - (10pts)
            - HigherSecondary - (10pts)
            - Secondary - (10pts)
            - Dipmola - (10pts)
        - OccupationalProofs
            - Appointment Letter - (10pts)
            - Trade License - (10pts)
            - TAX - (10pts)
            - Shop Aggrement - (10pts)
            - BankPassbook - (10pts)
            - SalarySlip - (10pts)
    - PrivacySetting (Refer -> LifeStyle, Education, Caste, Occupation)
        - VISIBLE_TO_ALL
        - ONLY_CONNECTIONS_ACCEPTED
        - NONE
    - ViewedYou (Referential -> User1 -> User2)
    - Mutual Matches (...)
    - FavouritedYou (Referential -> User1 -> User2)
    - LocationMatches (Refertials -> User1 --> User2)
        - City
        - Longitude
        - Latitude
        - District
        - User1 (ref)
        - User2 (ref)
    - isOnline
        - TRUE
        - False



- TrustScore
    - MatchingID (Referntial)
    - User1 (Referential <--> DocumentsUploaded->Id)
    - User2 (Referential <--> DocumentsUploaded->Id)
    - Score (1 + 1 = MAX.300)

- ActiveStatus
    - User (Referntials User->Id && User->isOnline)
    - timeStamp

- Messages
    - SentMessages
    - ReceivedMessages
    - SentTime
    - Status

- Chats
    - TrustScore (Referential)
    - User1 (ref.)
    - User2 (ref.)
    - Messages (Referentials)
    - Lastseen
        - User1
        - User2
    - ActiveStatus (Referential)
        - True
        - False



## API Endpoints And Requests

<br />

1. To Get All Users:

    ```bash
    GET /api/users/ HTTP/1.1
    Host: localhost:5000
    ```

2. Sign up using One Time Password (OTP)

    ```bash
    POST /api/auth/signup HTTP/1.1
    Content-Type: application/json
    Host: localhost:5000
    Content-Length: 35

    {
        "phoneNumber": "+918017204855"
    }
    ```

3. Signup account verification (OTP)

    ```bash
    POST /api/auth/signup/account/verify/otp HTTP/1.1
    Content-Type: application/json
    X-Magic-Token: cc12d9bd1590e43e31f5c48c7f800603170d994863a1c1744d7283a796263a04.1622055493701
    Host: localhost:5000
    Content-Length: 57

    {
        "otpCode": "119203",
        "phoneNumber": "+918017204855"
    }

    ```

4. Login using One Time Password (OTP)

    ```bash
    POST /api/auth/login/with-otp HTTP/1.1
    Content-Type: application/json
    Host: localhost:5000
    Content-Length: 35

    {
        "phoneNumber": "+918017204855"
    }
    ```

5. Login OTP verification

    ```bash
    POST /api/auth/login/otp/verify HTTP/1.1
    Content-Type: application/json
    X-Magic-Token: eaf98dd2f0871f9a2748e7755bcb731f965437664cc25b769233e2e95a9ac1b4.1622055741311
    Host: localhost:5000
    Content-Length: 57

    {
        "otpCode": "227245",
        "phoneNumber": "+918017204855"
    }
    ```

6. Create Profile Info

    ```bash
    PATCH /api/create-profile/user-info HTTP/1.1
    Content-Type: application/json
    Host: localhost:5000
    Content-Length: 299

    {
        "fullname": "Sounish Nath",
        "dateOfBirth": "1999-02-17",
        "gender": "Male",
        "email": "a@a.com",
        "password": "1234",
        "phoneNumber": "+918017204855",
        "martialStatus": "Single",
        "motherTongue": "Bengali",
        "isCasteBarrier": false,
        "fathersName": "Sudip Nath",
        "mothersName": "Manisha Nath"
    }
    ```

7. Add Address Information to User

    ```bash
    POST /api/create-profile/add-address HTTP/1.1
    Content-Type: application/json
    Host: localhost:5000
    Content-Length: 150

    {
        "address": "H/o - 91, Ward no - 11, Nischindipur",
        "city": "Ghatal",
        "district": "Paschim Medinipur",
        "country": "India",
        "zipCode": "721212"
    }
    ```


8. Logout user session

    ```bash
    GET /api/auth/logout HTTP/1.1
    Content-Type: application/json
    Host: localhost:5000
    Content-Length: 330

    {
        "otpCode": "d9fca3",
        "fullname": "Sounish Nath",
        "dateOfBirth": "1999-02-17",
        "age": 23,
        "gender": "Male",
        "phoneNumber": "8017207851",
        "email": "a@a.com",
        "password": "1234",
        "martialStatus": "Single",
        "motherTongue": "Bengali",
        "isCasteBarrier": false,
        "fathersName": "Sudip Nath",
        "mothersName": "Manisha Nath"
    }
    ```


## Systems Design



**NOTE:**
1. All of these are the Opensource Libraries and utilities; nothing to worry about copyright issues.
2. PLEASE SUGGEST RELEVANT CHANGES YOU WANT TO BRING AND ACT ACCORDINGLY!
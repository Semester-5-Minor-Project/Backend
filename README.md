<h2>Eduflex: Student Management Information System</h2>
<h3 style="text-align: center;">Semester 5 Minor Project</h3>
<h4 style="text-align: center;">Backend</h4>

## Team

| SID | Name |
| --- | ---- |
| 19103057 | Shubh Ashish |
| 19103087 | Prajval Bandha |
| 19103088 | Yuvraj Singh Deol |
| 19103094 | Yogesh Adhikari |

<hr/>

Steps to set it up:

- Make sure you have NodeJS installed.
- Clone the repository:
```
git clone git@github.com:Semester-5-Minor-Project/Backend.git
```
- Enter the backend directory and get all the dependencies:
```
npm install
```
- Set up the environment variables by making a .env file in the root directory and type in the following values:
```
DATABASE_NAME = <db_name>
DATABASE_PASSWORD = <db_password>
DATABASE_USER = <db_user>
HASH_SECRET = <any_string>
CLOUDINARY_CLOUD_NAME = <cloudinary_cloud_name>
CLOUDINARY_API_KEY = <cloudinary_api_key>
CLOUDINARY_API_SECRET = <cloudinary_api_secret>
```
- Rev up the development server with:
```
npm run dev
```

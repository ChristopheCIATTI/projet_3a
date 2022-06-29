::
:: Deployement projet 3A 
::

@echo off

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Display Info                                                         ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

echo Server Xampp Must be Started
echo Apache and Mysql

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Depart de l'installation                                               ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

:: Repertoire des telechargements
set userdwn=%USERPROFILE%\Downloads

set front_url=https://github.com/ChristopheCIATTI/projet_3a/archive/refs/heads/front_end.zip
set back_url=https://github.com/ChristopheCIATTI/projet_3a/archive/refs/heads/back_end.zip

echo Test : %front_url%
echo Test : %back_url%

::curl -k --silent --output NUL %front_url%
::curl -k --silent --output NUL %back_url%

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Download Front                                                       ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

curl -LO %front_url%
::ren front.zip front

@echo off
unzip.exe front_end.zip    

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Install Front                                                        ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

::set front_path=%cd%
::cd ..

::echo path
::echo %front_path%
cd projet_3a-front_end

::cd projet_3a-font_end_backup
@echo off
echo npm install
echo .

call npm install
::call npm install --prefix project %front_path%

::cd ..
::pwd

::cd projet_3a-font_end_backup
::dir
echo npm audit fix
echo.
@echo off
call npm audit fix
echo.

::echo current path
::pwd

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Unit Test                                                            ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

echo npm test
@echo off
call npm test

cd ..

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Download Back                                                        ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

curl -LO %back_url%

@echo off
unzip.exe back_end.zip

::call db.cmd

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Create DataBase                                                      ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
cd projet_3a-back_end\
set back_end_path=%cd%

cd sql
echo %cd%
set sqldir=%cd%
echo %sqldir%

cd c:\xampp\mysql\bin

mysql.exe -u root -e "CREATE DATABASE esimed_projet3a_cms_blog"
mysql.exe -u root -e "USE esimed_projet3a_cms_blog"
mysql.exe -u root -e "SHOW DATABASES LIKE 'esimed_projet3a_cms_blog'"


echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Create DataBase Tables                                               ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

set usersql=%sqldir%\user.sql
set articlesql=%sqldir%\article.sql

echo path user.sql : %usersql%
echo path article.sql : %articlesql%

mysql.exe -u root esimed_projet3a_cms_blog_test < %usersql%
mysql.exe -u root esimed_projet3a_cms_blog_test < %articlesql%

mysql.exe -u root -e "SHOW TABLES FROM esimed_projet3a_cms_blog"

cd %back_end_path%

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Install Back                                                         ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


@echo off
echo npm install
echo .

call npm install

echo npm audit fix
echo.
@echo off
call npm audit fix
echo.

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Unit Test                                                            ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

echo npm test
@echo off
call npm test

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Server Start                                                         ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

START "" call npm start

echo Le server est lance sur un autre cmd

echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Display User                                                         ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo.
echo user    user name  user email         user pwd
echo user1 : userTest1 userTest1@test.test user1
echo user2 : userTest2 userTest2@test.test user2
echo user3 : userTest3 userTest3@test.test user3
echo.   
::echo  ______________________________________
::echo |  User   |       Email       |Password|
::echo 8=========8===================8========8
::echo |userTest1|userTest1@test.test|user1   |
::echo |~~~~~~~~~|~~~~~~~~~~~~~~~~~~~|~~~~~~~~|
::echo |userTest2|userTest2@test.test|user2   |
::echo |~~~~~~~~~|~~~~~~~~~~~~~~~~~~~|~~~~~~~~|
::echo |userTest3|userTest3@test.test|user3   |
::echo ¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨

cd ..


echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
echo :: Generate Articles                                                    ::
echo ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

cd projet_3a-back_end\
set back_end_path=%cd%

cd sql
echo %cd%
set sqldir=%cd%

cd c:\xampp\mysql\bin

mysql.exe -u root esimed_projet3a_cms_blog < %articlesql%

echo :::::: End ::::::
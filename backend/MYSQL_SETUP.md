# MySQL Database Setup

## Prerequisites

1. MySQL server installed and running
2. MySQL root access or a user with database creation privileges

## Setup Steps

### 1. Install MySQL (if not already installed)

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql
```

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Windows:**
Download and install from [MySQL Official Website](https://dev.mysql.com/downloads/mysql/)

### 2. Secure MySQL Installation (Optional but Recommended)

```bash
sudo mysql_secure_installation
```

### 3. Create Database

Login to MySQL:
```bash
mysql -u root -p
```

Then run:
```sql
CREATE DATABASE kashmiri_treasures CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

If you want to create a dedicated user (recommended for production):
```sql
CREATE USER 'kashmiri_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON kashmiri_treasures.* TO 'kashmiri_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Update .env File

Edit `backend/.env` and update the `DATABASE_URL`:

**If using root:**
```
DATABASE_URL=mysql+pymysql://root:your_mysql_root_password@localhost/kashmiri_treasures
```

**If using dedicated user:**
```
DATABASE_URL=mysql+pymysql://kashmiri_user:your_secure_password@localhost/kashmiri_treasures
```

### 5. Install Python MySQL Driver

The requirements.txt already includes `pymysql`. Install it:
```bash
cd backend
pip install pymysql cryptography
```

### 6. Test Connection

Start the backend server:
```bash
python main.py
```

The tables will be created automatically on first run. Check the logs to ensure there are no connection errors.

## Troubleshooting

### Connection Refused
- Ensure MySQL server is running: `sudo systemctl status mysql`
- Check if MySQL is listening on the correct port (default: 3306)

### Access Denied
- Verify username and password in `.env`
- Check MySQL user privileges
- Try connecting manually: `mysql -u username -p`

### Database Not Found
- Ensure the database was created: `SHOW DATABASES;`
- Check database name matches in `.env`

### Character Encoding Issues
- Ensure database uses `utf8mb4` character set
- Verify collation is `utf8mb4_unicode_ci`

## Production Recommendations

1. **Don't use root user** - Create a dedicated database user
2. **Use strong passwords** - Generate secure passwords
3. **Enable SSL** - Configure MySQL SSL connections
4. **Backup regularly** - Set up automated database backups
5. **Monitor performance** - Use MySQL monitoring tools

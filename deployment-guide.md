# Natura Properties Deployment Guide

This document provides a comprehensive overview of the Natura Properties website deployment setup, including server configuration, key directories, and maintenance procedures.

## System Overview

The Natura Properties website is a React-based real estate platform with the following components:

- **Frontend**: React application built with Vite
- **Backend**: PocketBase (providing an API for property data)
- **Web Server**: Caddy (serving the frontend and proxying API requests to PocketBase)
- **Security**: Cloudflare (for DNS management, CDN, and security)
- **Deployment**: GitHub Actions CI/CD pipeline for zero-downtime deployment

## Server Information

- **Operating System**: Ubuntu 24.04.2 LTS
- **Server IP**: 116.203.198.232
- **Domain**: naturaproperties.com

## Key Directories

### Website Files

```
/var/www/natura/
├── dist/           # Current live version being served
├── new-dist/       # Temporary directory for new deployments
└── old-dist/       # Backup of previous version (for rollback)
```

### PocketBase Files

```
/var/www/pocketbase/
├── pocketbase      # PocketBase executable
├── pb_data/        # Database and uploaded files
└── pb_migrations/  # Database migrations (if used)
```

### Server Configuration

```
/etc/caddy/Caddyfile           # Caddy web server configuration
/etc/systemd/system/pocketbase.service  # PocketBase service definition
/var/log/caddy/                # Caddy log files
```

## Service Management

### PocketBase

```bash
# Start PocketBase
systemctl start pocketbase

# Stop PocketBase
systemctl stop pocketbase

# Restart PocketBase
systemctl restart pocketbase

# Check PocketBase status
systemctl status pocketbase

# View PocketBase logs
journalctl -u pocketbase -f
```

### Caddy

```bash
# Reload Caddy configuration
systemctl reload caddy

# Restart Caddy
systemctl restart caddy

# Check Caddy status
systemctl status caddy

# Validate Caddy configuration
caddy validate --config /etc/caddy/Caddyfile

# View Caddy logs
tail -f /var/log/caddy/naturaproperties.log
```

## Deployment Process

The website uses a GitHub Actions workflow for zero-downtime deployment:

1. Code is pushed to the main branch of the repository
2. GitHub Actions workflow is triggered
3. React application is built in the CI environment
4. Built files are transferred to the server's `/var/www/natura/new-dist/` directory
5. An atomic directory swap is performed to make the new version live
6. The old version is saved for potential rollback

### Manual Deployment Steps (if needed)

If you need to deploy manually:

```bash
# On your local machine
npm run build
rsync -avzr --delete dist/ root@116.203.198.232:/var/www/natura/new-dist/

# On the server
mv /var/www/natura/dist /var/www/natura/old-dist
mv /var/www/natura/new-dist /var/www/natura/dist
```

## Backup Strategy

### PocketBase Database

To backup the PocketBase database:

```bash
# On the server
systemctl stop pocketbase
tar -czf pocketbase_backup_$(date +%Y%m%d).tar.gz /var/www/pocketbase/pb_data
systemctl start pocketbase

# Transfer to local machine
scp root@116.203.198.232:/root/pocketbase_backup_*.tar.gz /path/to/local/backups/
```

### Website Files

The website files are in the GitHub repository, so a full backup is maintained through version control.

## Configuration Files

### Caddy Configuration

```
http://naturaproperties.com {
    root * /var/www/natura/dist
    encode gzip

    # Forward API requests to PocketBase
    handle /api/* {
        reverse_proxy [::1]:8090
    }

    # Handle all frontend routes
    handle {
        try_files {path} /index.html
    }

    # Add security headers
    header {
        # Prevent clickjacking
        X-Frame-Options "SAMEORIGIN"
        # XSS protection
        X-Content-Type-Options "nosniff"
        X-XSS-Protection "1; mode=block"
        # Referrer policy
        Referrer-Policy "strict-origin-when-cross-origin"
    }

    # Log requests
    log {
        output file /var/log/caddy/naturaproperties.log
    }
}
```

### PocketBase Service

```
[Unit]
Description=PocketBase service
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/var/www/pocketbase
ExecStart=/var/www/pocketbase/pocketbase serve --http="localhost:8090"
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

## Environment Variables

The React application uses the following environment variables:

- `VITE_API_URL`: https://naturaproperties.com/api
- `VITE_GA_MEASUREMENT_ID`: Google Analytics ID
- `VITE_FB_PIXEL_ID`: Facebook Pixel ID
- `VITE_ENABLE_ANALYTICS`: Set to "true" in production

## Cloudflare Configuration

The website uses Cloudflare for DNS management, CDN, and security features:

- **DNS Settings**: naturaproperties.com points to Cloudflare's proxy IPs
- **SSL/TLS**: Full (strict) mode
- **Security Level**: Medium or High
- **Bot Fight Mode**: On
- **Always Use HTTPS**: On

For SSH access, use the server's IP address directly:

```bash
ssh -i ~/.ssh/id_rsa root@116.203.198.232
ssh -i ~/.ssh/natura_deploy_key root@116.203.198.232
```

## Troubleshooting

### Website Not Loading

1. Check if Caddy is running: `systemctl status caddy`
2. Verify files exist in the dist directory: `ls -la /var/www/natura/dist/`
3. Check Caddy logs: `tail -f /var/log/caddy/naturaproperties.log`

### API Not Working

1. Check if PocketBase is running: `systemctl status pocketbase`
2. Test direct API access: `curl -I http://localhost:8090/api/health`
3. Check PocketBase logs: `journalctl -u pocketbase -f`

### Deployment Failed

1. Check GitHub Actions logs in the repository
2. Verify SSH connection from GitHub to the server
3. Check file permissions in deployment directories

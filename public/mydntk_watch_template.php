<?php
/**
 * Video Player Page for mydntk.com
 * Copy this file to: https://mydntk.com/watch.php
 * 
 * Shows video player when coming from 7anime.site
 * Redirects to home on refresh
 */

// Start session
session_start();

// Configuration
$mydntkHomeUrl = 'https://mydntk.com/';
$sessionKey = 'video_player_viewed';
$refererDomain = '7anime.site';

// Get referer
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$isFrom7anime = !empty($referer) && strpos($referer, $refererDomain) !== false;

// Get parameters from URL
$episodeId = $_GET['episode'] ?? '';
$animeTitle = $_GET['anime'] ?? '';
$episodeNumber = $_GET['ep'] ?? '';
$seasonNumber = $_GET['season'] ?? '';
$videoUrl = $_GET['video_url'] ?? ''; // Video server URL from 7anime

// Check if this is a refresh (session exists)
if (isset($_SESSION[$sessionKey]) && $_SESSION[$sessionKey] === true) {
    // Second visit (refresh) - redirect to mydntk home
    header('Location: ' . $mydntkHomeUrl, true, 302);
    exit;
}

// First visit - check if coming from 7anime and has video URL
if (!$isFrom7anime || empty($videoUrl)) {
    // Not from 7anime or no video URL - redirect to home
    header('Location: ' . $mydntkHomeUrl, true, 302);
    exit;
}

// First visit from 7anime - set session and show video player
$_SESSION[$sessionKey] = true;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Watch Video - Domain Toolkit</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: #0f172a;
            color: #f8fafc;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        
        .header {
            background: #1e293b;
            padding: 1rem 2rem;
            border-bottom: 1px solid #334155;
        }
        
        .header-content {
            max-width: 1400px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: #3b82f6;
            text-decoration: none;
        }
        
        .home-link {
            color: #94a3b8;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            transition: all 0.3s;
        }
        
        .home-link:hover {
            background: #334155;
            color: #f8fafc;
        }
        
        .container {
            flex: 1;
            max-width: 1400px;
            width: 100%;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .video-wrapper {
            background: #1e293b;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
            margin-bottom: 2rem;
        }
        
        .video-container {
            position: relative;
            width: 100%;
            padding-bottom: 56.25%; /* 16:9 aspect ratio */
            height: 0;
            background: #000;
        }
        
        .video-container iframe {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border: none;
        }
        
        .info-panel {
            background: #1e293b;
            padding: 1.5rem;
            border-radius: 1rem;
            margin-bottom: 2rem;
        }
        
        .info-panel h2 {
            font-size: 1.25rem;
            margin-bottom: 1rem;
            color: #f8fafc;
        }
        
        .info-panel p {
            color: #94a3b8;
            line-height: 1.6;
        }
        
        .warning {
            background: #1e293b;
            border: 1px solid #3b82f6;
            border-radius: 0.5rem;
            padding: 1rem;
            margin-bottom: 2rem;
            color: #94a3b8;
        }
        
        .warning strong {
            color: #3b82f6;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 1rem;
            }
            
            .header {
                padding: 1rem;
            }
            
            .header-content {
                flex-direction: column;
                gap: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="header-content">
            <a href="<?= $mydntkHomeUrl ?>" class="logo">🌐 Domain Toolkit</a>
            <a href="<?= $mydntkHomeUrl ?>" class="home-link">← Back to Home</a>
        </div>
    </div>
    
    <div class="container">
        <div class="warning">
            <strong>⚠️ Note:</strong> If you refresh this page, you will be redirected to our home page.
        </div>
        
        <div class="video-wrapper">
            <div class="video-container">
                <iframe 
                    id="videoFrame"
                    src="<?= htmlspecialchars($videoUrl) ?>" 
                    allowfullscreen 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    frameborder="0">
                </iframe>
            </div>
        </div>
        
        <?php if (!empty($animeTitle)): ?>
        <div class="info-panel">
            <h2>📺 <?= htmlspecialchars($animeTitle) ?></h2>
            <?php if (!empty($episodeNumber)): ?>
                <p>Episode <?= htmlspecialchars($episodeNumber) ?></p>
            <?php endif; ?>
            <?php if (!empty($seasonNumber)): ?>
                <p>Season <?= htmlspecialchars($seasonNumber) ?></p>
            <?php endif; ?>
            <p style="margin-top: 1rem; color: #64748b;">
                You are watching this video on Domain Toolkit. The video player is embedded from 7anime.site.
            </p>
        </div>
        <?php endif; ?>
    </div>
    
    <script>
        // Prevent accidental refresh
        let isRefreshing = false;
        
        window.addEventListener('beforeunload', function(e) {
            if (!isRefreshing) {
                // Optional: Show warning
                // e.preventDefault();
                // e.returnValue = '';
            }
        });
        
        // Handle refresh detection
        window.addEventListener('pageshow', function(event) {
            // If page was loaded from cache (back/forward), it's not a refresh
            if (event.persisted) {
                return;
            }
            
            // Check if this is a refresh
            if (performance.navigation.type === 1) {
                // This is a refresh - redirect will happen server-side
                console.log('Page refreshed - redirecting...');
            }
        });
    </script>
</body>
</html>


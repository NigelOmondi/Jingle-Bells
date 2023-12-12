document.addEventListener('DOMContentLoaded', () => {
    const music = new Audio();
    const playButton = document.getElementById('toggle-dropdown');
    const musicDropdown = document.getElementById('music-dropdown');
    const musicList = document.getElementById('music-list');
    const addMusicButton = document.getElementById('add-music');
    const musicUploadInput = document.getElementById('music-upload');
    let dropdownTimeout;

    // Predefined music tracks mapping
    const tracks = {
        "Snow is Falling": "snow_is_falling.m4a",
        "We Wish You": "we_wish_you.m4a",
        "Can't Help Falling": "Cant_Help_Falling.m4a",
        "Little Drummer Boy": "little_drummer_boy.m4a"
    };

    // Play/Pause button functionality
    playButton.addEventListener('click', () => {
        toggleMusicDropdown();
        playOrPauseMusic();
    });

    // Toggle dropdown and reset timeout
    function toggleMusicDropdown() {
        musicDropdown.style.display = musicDropdown.style.display === 'block' ? 'none' : 'block';
        resetDropdownTimeout();
    }

    // Play or pause the current track
    function playOrPauseMusic() {
        if (music.paused) {
            music.play();
            playButton.textContent = 'Pause Music';
        } else {
            music.pause();
            playButton.textContent = 'Play Music';
        }
    }

    // Reset the dropdown timeout
    function resetDropdownTimeout() {
        clearTimeout(dropdownTimeout);
        dropdownTimeout = setTimeout(() => {
            musicDropdown.style.display = 'none';
        }, 5000); // Close after 5 seconds
    }

    // Add event listeners to reset timeout on interaction
    musicDropdown.addEventListener('mouseover', resetDropdownTimeout);
    musicDropdown.addEventListener('mouseout', resetDropdownTimeout);
    musicDropdown.addEventListener('click', resetDropdownTimeout);

    // Add click event to each list item
    musicList.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', () => {
            playMusic(tracks[item.textContent] || item.textContent);
            musicDropdown.style.display = 'none';
        });
    });

    // Add music to list
    addMusicButton.addEventListener('click', () => {
        musicUploadInput.click();
    });

    musicUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const musicItem = document.createElement('li');
                musicItem.textContent = file.name;
                musicItem.addEventListener('click', () => {
                    playMusic(e.target.result);
                });
                musicList.appendChild(musicItem);
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to play music
    function playMusic(src) {
        music.src = src;
        music.play();
        playButton.textContent = 'Pause Music';
    }
});

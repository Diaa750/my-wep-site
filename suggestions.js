document.getElementById("discord-btn").addEventListener("click", function() {
            window.location.href = "https://discord.com/oauth2/authorize?client_id=1297926540297895989&redirect_uri=http://127.0.0.1:5500/index.html&response_type=code&scope=identify";
        });

        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');

        if (code) {
            fetch('https://discord.com/api/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    client_id: '1297926540297895989',
                    client_secret: '3sMCOrr6NgKxRm6f79U0Ajj2oaYHVOUp',
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: 'http://127.0.0.1:5500/index.html'
                })
            })
            .then(response => response.json())
            .then(data => {
                const accessToken = data.access_token;
                localStorage.setItem('access_token', accessToken);
                localStorage.setItem('is_logged_in', 'true');
                getUserInfo(accessToken);

                const url = new URL(window.location.href);
                url.searchParams.delete('code');
                window.history.replaceState({}, document.title, url.toString());
            })
            .catch(console.error);
        }

        function getUserInfo(accessToken) {
            fetch('https://discord.com/api/users/@me', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
            .then(response => response.json())
            .then(user => {
                localStorage.setItem('user_avatar', `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`);
                localStorage.setItem('user_name', user.username);
                localStorage.setItem('user_id', user.id);
                displayUserInfo(user);
            })
            .catch(console.error);
        }

        function displayUserInfo(user) {
            const discordButton = document.getElementById('discord-btn');
            const userAvatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

            const img = document.createElement('img');
            img.src = userAvatarUrl;
            img.alt = user.username;
            img.style.width = '50px';
            img.style.height = '50px';
            img.style.borderRadius = '50%';
            img.style.cursor = 'pointer'; 
            discordButton.replaceWith(img);

            img.addEventListener("click", function(event) {
                displayOptions(user);
            });
        }

        function displayOptions(user) {
            const optionsMenu = document.createElement('div');
            optionsMenu.style.position = 'absolute';
            optionsMenu.style.left = '90%';
            optionsMenu.style.top = '10%';
            optionsMenu.style.transform = 'translate(-50%, 0)';
            optionsMenu.style.display = 'block';
            optionsMenu.style.backgroundColor = '#fff';
            optionsMenu.style.border = '2px solid #ccc';
            optionsMenu.style.padding = '10px';
            optionsMenu.style.borderRadius = '5px';
            optionsMenu.style.boxShadow = '2px 2px 5px rgba(6, 38, 41, 0.5)';
            optionsMenu.style.maxWidth = '90vw';
            optionsMenu.style.minWidth = '300px';

            const usernameOption = document.createElement('div');
            usernameOption.textContent = `Username: ${user.username}`;
            usernameOption.style.marginBottom = '5px';

            const userIdOption = document.createElement('div');
            userIdOption.textContent = `Discord ID: ${user.id}`;
            userIdOption.style.marginBottom = '3px';

            const logoutOption = document.createElement('div');
            logoutOption.textContent = 'Logout';
            logoutOption.style.color = 'red';
            logoutOption.style.cursor = 'pointer';
            logoutOption.addEventListener("click", function() {
                logout();
            });

            optionsMenu.appendChild(usernameOption);
            optionsMenu.appendChild(userIdOption);
            optionsMenu.appendChild(logoutOption);
            document.body.appendChild(optionsMenu);
        }

        function logout() {
            localStorage.removeItem('access_token');
            localStorage.removeItem('user_avatar');
            localStorage.removeItem('user_name');
            localStorage.removeItem('user_id');
            localStorage.removeItem('is_logged_in');
            location.reload();
        }

        document.getElementById("send-suggestion-btn").addEventListener("click", function() {
            // التحقق إذا كان المستخدم قد ربط حسابه
            const isLoggedIn = localStorage.getItem('is_logged_in');
            if (isLoggedIn !== 'true') {
                alert("يرجى ربط حسابك أولاً!");
                return;
            }

            // الحصول على الاقتراح من الـ textarea
            const suggestion = document.getElementById("suggestion").value;

            // إذا لم يكن هناك اقتراح
            if (!suggestion) {
                alert("يرجى إدخال اقتراح!");
                return;
            }

            // الحصول على معلومات المستخدم المخزنة
            const userName = localStorage.getItem('user_name');
            const userAvatar = localStorage.getItem('user_avatar');
            const userId = localStorage.getItem('user_id');

            // إرسال الاقتراح إلى السيرفر
            fetch('http://localhost:3000/send-suggestion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    suggestion: suggestion,
                    userName: userName,
                    userAvatar: userAvatar,
                    userId: userId
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("تم إرسال الاقتراح بنجاح!");
                } else {
                    alert("فشل في إرسال الاقتراح. حاول مرة أخرى.");
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert("حدث خطأ أثناء إرسال الاقتراح.");
            });
        });
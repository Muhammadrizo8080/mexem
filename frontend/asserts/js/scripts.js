document.addEventListener('DOMContentLoaded', () => {
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Standart submit harakatini bekor qilish
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const username = usernameInput.value;
            const password = passwordInput.value;

            // Backendga so'rov yuborish
            fetch('http://127.0.0.1:8000/api/token/', { // Backend login API manzilingizni kiriting
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username, password: password }),
            })
            .then(response => {
                if (!response.ok) {
                    // Agar javob xatolik bo'lsa (masalan, 401 Unauthorized)
                    throw new Error(`Xatolik: ${response.status}`);
                }
                return response.json(); // Javobni JSON formatida o'qish
            })
            .then(data => {
                // Backenddan muvaffaqiyatli javob keldi
                console.log('Muvaffaqiyatli kirish:', data);

                // Agar backend token qaytarsa, uni localStorage ga saqlash mumkin
                if (data.token) {
                    localStorage.setItem('authToken', data.token);
                }
                localStorage.setItem('foydalanuvchi_nomi', username);
                alert('Muvaffaqiyatli kirish!');
                window.location.href = 'dashboard.html';
            })
            .catch((error) => {
                // So'rovda xatolik yuz berdi
                console.error('Kirishda xatolik:', error);
                alert('Kirishda xatolik yuz berdi. Iltimos, ma\'lumotlaringizni tekshiring.');
            });
        });
    }

    // Sahifa yuklanganda saqlangan foydalanuvchi nomini tekshirish (misol uchun)
    const saqlanganFoydalanuvchi = localStorage.getItem('foydalanuvchi_nomi');
    if (saqlanganFoydalanuvchi) {
        console.log('Saqlangan foydalanuvchi:', saqlanganFoydalanuvchi);
        // Agar foydalanuvchi avval kirgan bo'lsa, uni to'g'ridan-to'g'ri dashboardga yo'naltirish mumkin:
        window.location.href = 'dashboard.html';
    }
});

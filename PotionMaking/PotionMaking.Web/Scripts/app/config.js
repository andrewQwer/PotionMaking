'use strict';

module.exports = {
    Url: {
        RegisterUser: '/api/accounts/create',
        LoadUser: '/api/accounts/user',
        LoginUser: '/api/token'
    },
    LocalUrl: {
        Root: '/',
        Login: '/login',
        Register: '/register',
        RegisterSuccess: '/registerSuccess',
        GameRoom: '/rooms',
        CreateRoom: '/createRoom',
        Logout: '/logout'
    },
    Validation: {
        Registration: {
            messages: {
                'reg-username': "Введите имя пользователя",
                'reg-email': {
                    required: "Введите email",
                    email: "Введенное значение не соответствует формату email"
                },
                'reg-pass': {
                    required: "Введите пароль",
                    minlength: $.validator.format("Введите как минимум {0} символов"),
                },
                'reg-repeat-pass': {
                    equalTo: "Повторите пароль"
                }
            }
        },
        Login: {
            messages: {
                'auth-username': "Введите имя пользователя",
                'auth-password': {
                    required: "Введите пароль",
                    minlength: $.validator.format("Введите как минимум {0} символов")
                }
            }
        },
        CreateRoom: {
            messages: {
                'players-number': {
                    required: 'Введите количество игроков',
                    digits: 'Введите только цифры',
                    range: $.validator.format('Количество игроков должно быть от {0} до {1}')
                },
                'room-pass': {
                    required:'Введите пароль',
                    minlength: $.validator.format("Введите как минимум {0} символов")
                }
            }
        }

    },
    Messages: {
        Oops: "Случилось что-то непредвиденное, попробуйте повторить запрос позже.",
        FillInputs: "Заполните правильно все необходимые поля"
    }
};


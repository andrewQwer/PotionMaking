'use strict';

module.exports = {
    Url: {
        RegisterUser: '/api/accounts/create',
        LoginUser: '/api/token'
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
        }
    },
    Messages: {
        Oops: "Случилось что-то непредвиденное, попробуйте повторить запрос позже."
    }
};


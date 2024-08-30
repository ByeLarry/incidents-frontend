# Клиентская часть 


# Описание
Данный репозиторий содержит реализацию клиентской части, входящей в состав проекта ***incidents***.
Использовались библиотеки **React 18**, **mobx** и **ymap3-components**.
Связь с сервером (API-шлюз) осуществляется по http/https и websocket.


## Установка

### Локально
```bash
# Установка зависимостей
npm install

# Запуск в dev режиме
npm run dev
```

### Docker 
```bash
# Создание и запуск docker сервисов
docker-compose up -d
```

### Полная установка 
_Чтобы не копировать вручную можно запустить **setup.bat** для Windows или **setup.sh** для Linux_
```bash
mkdir incidents

cd incidents

git clone https://github.com/ByeLarry/incidents-frontend.git
cd incidents-frontend
docker-compose up -d
cd ../

git clone https://github.com/ByeLarry/incidents-gateway.git
cd incidents-gateway
docker-compose up -d 
cd ../

git clone https://github.com/ByeLarry/incidents-marks-service.git
cd incidents-marks-service
docker-compose up -d 
cd ../

git clone https://github.com/ByeLarry/incidents-auth-service.git
cd incidents-auth-service
docker-compose up -d 
cd ../
```

## Проектирование

_Диаграммы можно сохранять и редактировать в ***[draw.io](https://app.diagrams.net/)***_

- ### Диаграмма прецедентов
     ![Диаграмма прецедентов](https://github.com/user-attachments/assets/28d2a1f0-4f0a-4959-92ee-ba4041a0e844)

- ### Архитектура приложения
    ![Архитектура приложения](https://github.com/user-attachments/assets/15ca1580-62a1-418b-bd27-fbd20f18426d)

- ### Граф (схема) перемещения по сайту
  ![Граф (схема) перемещения по сайту](https://github.com/user-attachments/assets/81389748-da55-4fb7-a85e-90c9b789123b)

## Прототипы пользовательского интерфейса

_Прототипы в **Figma**: https://www.figma.com/design/uS1sOHazna93fKYVemZtpb/incidents?node-id=0-1&t=I219QsAhbcTF8Shd-1_

- ### Прототип главной страницы
  ![Главная страница](https://github.com/ByeLarry/incidents-frontend/assets/120035099/9e6d3036-5451-4641-9836-744bce41cc1f)

- ### Прототип страницы регистрации
  ![Регистрация](https://github.com/ByeLarry/incidents-frontend/assets/120035099/0b8cf9b1-144e-4a54-b91c-b8bc6dfcb0bd)

- ### Прототип страницы входа
  ![Страница входа](https://github.com/ByeLarry/incidents-frontend/assets/120035099/feda1642-3500-466e-846d-7ce0245b88b7)

- ### Прототип страницы 404
  ![Страница ошибки](https://github.com/ByeLarry/incidents-frontend/assets/120035099/388927f1-51af-4456-b7af-225a6589160b)

- ### Прототип окна с описанием инцидента
  ![Окно с описанием инцидента](https://github.com/user-attachments/assets/4ebe520d-8945-449e-a39f-ff271e67866c)

## Ссылки

- #### API-шлюз:  *https://github.com/ByeLarry/incidents-gateway*
- #### Сервис авторизации:  *https://github.com/ByeLarry/incidents-auth-service*
- #### Сервис марок (инцидентов): *https://github.com/ByeLarry/indcidents-marks-service*
- #### Демонастрация функционала версии 0.1.0: *https://youtu.be/H0-Qg97rvBM*




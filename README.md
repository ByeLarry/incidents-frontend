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

### Полная установка проекта
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

git clone https://github.com/ByeLarry/incidents-admin-frontend.git
cd incidents-admin-frontend
docker-compose up -d 
cd ../

git clone https://github.com/ByeLarry/incidents-search-service.git
cd incidents-search-service/solution
docker-compose -f "docker-compose.yml" -f "docker-compose.override.yml" -p "incidents-search-service" up -d
cd ../../
```

## Проектирование

_Диаграммы можно сохранять и редактировать в ***[draw.io](https://app.diagrams.net/)***_

- ### Диаграмма прецедентов
  ![Диаграмма прецедентов](https://github.com/user-attachments/assets/a7cf66c9-3a7a-4e5e-9556-cb60af01fa84)

- ### Архитектура системы
  ![Архитектура приложения на этапе проектирования](https://github.com/user-attachments/assets/8533133a-3b4d-403c-b672-0f98d5f5f04a)


- ### Граф (схема) перемещения по сайту
  ![Граф (схема) перемещения по сайту](https://github.com/user-attachments/assets/81389748-da55-4fb7-a85e-90c9b789123b)

- ### Диаграмма последовательности операций при взаимодействии с reCAPTCHA
  ![Диаграмма reCAPTHCA](https://github.com/user-attachments/assets/cc79c69e-472a-4746-83a8-51742c1db57e)

- ### Компоненты клиентской части пользователя
  ![Компоненты клиентской части пользователя](https://github.com/user-attachments/assets/4d957b92-3b6f-4d80-837c-a728b83914fb)

- ### Схема алгоритма получения данных пользователя
  ![Схема алгоритма получения данных пользователя](https://github.com/user-attachments/assets/07487116-1372-40a6-96f5-42e9fd2a2684)

- ### Схема алгоритма обновления токена доступа
  ![Схема алгоритма обновления токена доступа на клиенте](https://github.com/user-attachments/assets/b9b093ee-793c-4895-9779-0033179e5ba4)

- ### Схема алгоритма установки заголовка авторизации
  ![Схема алгоритма установки заголовка авторизации](https://github.com/user-attachments/assets/8a8cd4e7-56e6-436f-8f89-bf90fc464c86)

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

- #### API-шлюз:  *https://github.com/ByeLarry/incidents-gateway*  [![incidents-gateway](https://github.com/ByeLarry/incidents-gateway/actions/workflows/incidents-gateway.yml/badge.svg)](https://github.com/ByeLarry/incidents-gateway/actions/workflows/incidents-gateway.yml)
- #### Сервис авторизации:  *https://github.com/ByeLarry/incidents-auth-service*  [![incidents-auth](https://github.com/ByeLarry/incidents-auth-service/actions/workflows/incidents-auth.yml/badge.svg)](https://github.com/ByeLarry/incidents-auth-service/actions/workflows/incidents-auth.yml)
- #### Сервис марок (инцидентов): *https://github.com/ByeLarry/indcidents-marks-service*  [![incidents-marks](https://github.com/ByeLarry/incidents-marks-service/actions/workflows/incidents-marks.yml/badge.svg)](https://github.com/ByeLarry/incidents-marks-service/actions/workflows/incidents-marks.yml)
- #### Сервис поиска *https://github.com/ByeLarry/incidents-search-service*  [![incidents-search](https://github.com/ByeLarry/incidents-search-service/actions/workflows/incidents-search.yml/badge.svg)](https://github.com/ByeLarry/incidents-search-service/actions/workflows/incidents-search.yml)
- #### Панель администратора *https://github.com/ByeLarry/incidents-admin-frontend.git*  [![incidents-admin-frontend](https://github.com/ByeLarry/incidents-admin-frontend/actions/workflows/incidents-admin-frontend.yml/badge.svg)](https://github.com/ByeLarry/incidents-admin-frontend/actions/workflows/incidents-admin-frontend.yml)
- #### Сервис мониторинга состояния системы: *https://github.com/ByeLarry/incidents-healthcheck*  [![incidents-healthcheck](https://github.com/ByeLarry/incidents-healthcheck/actions/workflows/incidents-healthcheck.yml/badge.svg)](https://github.com/ByeLarry/incidents-healthcheck/actions/workflows/incidents-healthcheck.yml)
- #### Демонастрация функционала пользовательской части версии 0.1.0: *https://youtu.be/H0-Qg97rvBM*
- #### Демонастрация функционала пользовательской части версии 0.2.0: *https://youtu.be/T33RFvfTxNU*
- #### Демонастрация функционала панели администратора версии 0.1.0: *https://youtu.be/7LTnEMYuzUo*





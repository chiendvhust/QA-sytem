FROM continuumio/anaconda3


RUN apt-get update \
 && apt-get install -y locales \
 && apt-get update \
 && dpkg-reconfigure -f noninteractive locales \
 && locale-gen C.UTF-8 \
 && /usr/sbin/update-locale LANG=C.UTF-8 \
 && echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen \
 && locale-gen \
 && apt-get install -y curl unzip \
 && apt-get clean \
 && apt-get autoremove


# Creating Application Source Code Directory
RUN mkdir -p /usr/src/app

# Setting Home Directory for containers
WORKDIR /usr/src/app

# Installing python dependencies
COPY requirements.txt /usr/src/app/

RUN apt-get install -y poppler-utils

RUN pip install --no-cache-dir -r requirements.txt

# Copying src code to Container
COPY . /usr/src/app

RUN chmod -R 777 /usr/src/app
RUN chmod -R 777 /usr/src
RUN python3 -c "from docker import cache_models;cache_models()"

# Application Environment variables
#ENV APP_ENV development
ENV PORT 8777

# Exposing Ports
EXPOSE $PORT

# Setting Persistent data
VOLUME ["/app-data"]

# Running Python Application
CMD gunicorn -b :$PORT app:app --timeout 600 --workers 1

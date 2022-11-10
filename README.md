# React18-webpack-babel
![image](https://user-images.githubusercontent.com/104764474/201090568-b06aedbc-c94a-41e4-9fb0-eeb3b445d8df.png)

## mode
mode가 development면 개발용, production 이면 배포용 <br/>
배포용일 경우에는 알아서 최적화가 적용된다.  <br/>
따라서 기존 최적화 플러그인들이 대량으로 호환되지 않는다.<br/>

## devtool
Source Map 이란 배포용으로 빌드한 파일과 원본 파일을 서로 연결시켜주는 기능이다. <br/>
이 소스맵을 이용해 배포용 파일의 특정 부분이 원본 소스의 어떤 부분인지 확인이 가능하다. <br/>
[설정 옵션](https://webpack.js.org/configuration/devtool/#devtool)

## resolve
웹팩이 알아서 경로나 확장자를 처리할 수 있게 도와주는 옵션이다.
modules에 node_modules를 넣으면 디렉토리의 node_modules를 인식 할 수 있다.
그리고 extensions에 넣은 확장자들은 웹펙에서 알아서 처리해주기 때문에 파일에 확장자를 입력할 필요가 없어진다.

## entry
이 부분이 웹팩이 파일을 읽어들이기 시작하는 부분이다 <br/>
객체 의 키 값이 파일의 이름이고 값이 파일의 경로로 나온다.<br/>
```
{
  entry:{
    app:'파일 경로',
    app2:'파일 경로'
  }
}
```
하나의 결과물만 가능한것이 아닌 여러개까지 가능하다.<br/>
```
{
  entry:{
    app:['a.js','b.js']
  }
}
```
위와 같이 하면 a.js와 b.js가 한 파일로 엮여 app.js라는 결과물로 나오게된다.<br/>

## output
```
{
  output:{
    path: '/dist',
    filename:'[name].js',
    publicPath:'/'
  }
}
```
path 는 output으로 나올 파일이 저장될 경로를 나타내며,<br/>
publicPath는 파일들이 위치할 서버상의 경로를 나타낸다.<br/>
filename은 결과물로 나올 파일의 이름인데, 위와 같이하면 entry에서 키값으로 입력한 이름으로 나온다.<br/>
[hash]로 하면 웹팩 컴파일 시 매번 랜덤한 문자열을 붙여준다. 따라서 캐시 삭제시 유용하다.<br/>
[hash]가 랜덤 문자열을 붙여준다면, [chunkhash]는 파일이 달라질 때에만 랜덤 값이 바뀐다.<br/>
이것을 사용하면 변경되지 않은 파일들은 계속 캐싱하고 변경된 파일만 새로 불러올 수 있다.

## loader
웹팩을 사용하면 ES2015 이상의 문법이나 타입스크립트, 그리고 리액트의 jsx같은 문법을 브라우저에서 사용하기위해<br/>
주로 babel을 같이 사용하게 된다.<br/>
@babel-loader , @babel/core 는 필수적으로 설치 되며 <br/>
preset-env는 브라우저에 필요한 ecmascript 버전을 자동으로 파악해서 polyfill을 넣어준다.<br/>
<br/>
***test*** 는 정규식 조건에 부합하는 파일들을 loader에 지정한 로더가 컴파일 해준다.<br/>
***options***는 로더에 대한 옵션을 설정한다.<br/>
***exclude***는 제외할 폴더나 파일로, 바벨로 컴파일 하지 않을 것들을 지정해준다.<br/>
node_modules 내부의 소스는 대부분 라이브러리가 배포될 때 이미 컴파일 되어있기 때문에 exclude에 넣는다.<br/>
반대로 ***include***로 꼭 로더를 사용해서 컴파일할 것들을 지정할 수도 있다.<br/>
<br/>
추가로, preset-env 안에 옵션이 들어가 있는데,<br/>
[자세한 옵션은 여기에](https://babeljs.io/docs/en/babel-preset-env#options)<br/>

## plugin
플러그인은 약간 부가적인 기능이다.<br/>
다양한 플러그인들이 있는데 이를 사용하면 효과적으로 번들링을 할 수 있다.<br/>


## devServer
***port*** 는 개발 서버인 localhost의 포트를 설정가능하다.<br/>
***historyApiFallback***은 react-router같은 것을 쓸 때, 새로고침시 Cannot get/signup 이런 에러를 막아준다. [조금 더자세한 내용은](https://basemenks.tistory.com/270)<br/>
***publicPath***는 웹팩 데브서버가 번들한 결과물이 위치하는 경로인데, 보통 output에 위치한 pulbichPath와 동일한 위치로 적는다.<br/>




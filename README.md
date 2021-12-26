MainApplication 은 Application 을 1개만 가질 수 있습니다.

Application 은 다수의 Service 를 등록할 수 있습니다.

Service 는 Service 를 포함 시킬 수 있습니다.

WebService 는 Service 를 상속하며, Config 에 Viewer 를 받아들여 외부 Viewer 와 연결 통로 역할을 합니다.


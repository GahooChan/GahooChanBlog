---
icon: book-open
title: 设计模式
tags: [编程基础]
category: 编程学习
date: 2025-10-6
---
# 设计模式

[[toc]]

## 什么是设计模式

设计模式是软件设计中常见问题的通用解决方案，它是一套被反复使用、多数人知晓的、经过分类编目的、代码设计经验的总结。设计模式并不直接用来完成代码的编写，而是描述在各种不同情况下，应当如何解决问题的一种方案。

设计模式的主要目的是：
- 提高代码的可复用性
- 提高代码的可维护性
- 提高代码的可读性
- 降低代码之间的耦合度
- 使代码更加灵活、易于扩展

## 设计模式的分类

根据目的和用途，设计模式通常可以分为三大类：

### 创建型模式

创建型模式关注对象的创建过程，这些模式提供了一种创建对象的机制，使得系统在创建对象时不会对客户端代码依赖于具体类，从而使系统更加灵活。常见的创建型模式包括：

- 单例模式（Singleton Pattern）
- 工厂方法模式（Factory Method Pattern）
- 抽象工厂模式（Abstract Factory Pattern）
- 建造者模式（Builder Pattern）
- 原型模式（Prototype Pattern）

### 结构型模式

结构型模式关注类和对象的组合，这些模式通过组合来获得更大的结构，或者通过修改类的结构来解决特定的问题。常见的结构型模式包括：

- 适配器模式（Adapter Pattern）
- 桥接模式（Bridge Pattern）
- 组合模式（Composite Pattern）
- 装饰器模式（Decorator Pattern）
- 外观模式（Facade Pattern）
- 享元模式（Flyweight Pattern）
- 代理模式（Proxy Pattern）

### 行为型模式

行为型模式关注对象之间的通信和协作，这些模式描述了对象之间如何相互协作以完成单个对象无法完成的任务。常见的行为型模式包括：

- 责任链模式（Chain of Responsibility Pattern）
- 命令模式（Command Pattern）
- 解释器模式（Interpreter Pattern）
- 迭代器模式（Iterator Pattern）
- 中介者模式（Mediator Pattern）
- 备忘录模式（Memento Pattern）
- 观察者模式（Observer Pattern）
- 状态模式（State Pattern）
- 策略模式（Strategy Pattern）
- 模板方法模式（Template Method Pattern）
- 访问者模式（Visitor Pattern）

## 设计模式详解

### 单例模式（Singleton Pattern）

单例模式确保一个类只有一个实例，并提供一个全局访问点来获取该实例。

**核心思想**：控制类的实例化过程，确保在任何情况下都只有一个实例。

**适用场景**：
- 资源共享的情况下，避免资源的重复创建
- 控制资源的情况下，需要避免多个对象对同一资源的并发访问

**实现示例**：

```javascript
class Singleton {
  // 私有静态实例
  private static instance: Singleton;
  
  // 私有构造函数，防止外部实例化
  private constructor() {}
  
  // 公共静态方法，提供全局访问点
  public static getInstance(): Singleton {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
  
  public showMessage(): void {
    console.log('我是单例模式的唯一实例！');
  }
}

// 使用
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();

console.log(instance1 === instance2); // 输出: true
instance1.showMessage(); // 输出: 我是单例模式的唯一实例！
```

### 工厂方法模式（Factory Method Pattern）

工厂方法模式定义了一个创建对象的接口，但由子类决定实例化的类是哪一个。工厂方法让类的实例化推迟到子类中进行。

**核心思想**：将对象的创建逻辑封装在一个方法中，由子类决定具体创建哪个对象。

**适用场景**：
- 当一个类不知道它所必须创建的对象的类的时候
- 当一个类希望由它的子类来指定它所创建的对象的时候
- 当类将创建对象的职责委托给多个帮助子类中的某一个，并且你希望将哪一个帮助子类是代理者这一信息局部化的时候

**实现示例**：

```javascript
// 产品接口
interface Product {
  operation(): string;
}

// 具体产品A
class ConcreteProductA implements Product {
  public operation(): string {
    return '产品A的操作结果';
  }
}

// 具体产品B
class ConcreteProductB implements Product {
  public operation(): string {
    return '产品B的操作结果';
  }
}

// 工厂接口
interface Creator {
  factoryMethod(): Product;
  
  // 可能包含一些依赖于产品的操作
  someOperation(): string {
    const product = this.factoryMethod();
    return `创建者: ${product.operation()}`;
  }
}

// 具体工厂A
class ConcreteCreatorA implements Creator {
  public factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

// 具体工厂B
class ConcreteCreatorB implements Creator {
  public factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

// 使用
function clientCode(creator: Creator) {
  console.log(creator.someOperation());
}

console.log('客户端使用创建者A:');
clientCode(new ConcreteCreatorA());

console.log('客户端使用创建者B:');
clientCode(new ConcreteCreatorB());
```

### 抽象工厂模式（Abstract Factory Pattern）

抽象工厂模式提供一个创建一系列相关或相互依赖对象的接口，而无需指定它们具体的类。

**核心思想**：创建一系列相关的对象，而不依赖于它们的具体类。

**适用场景**：
- 当需要创建的对象是一系列相互关联或相互依赖的产品族时
- 当系统需要独立于其产品的创建、组合和表示时
- 当希望提供一个产品类库，只想暴露接口而不是实现时

**实现示例**：

```javascript
// 抽象产品A
interface AbstractProductA {
  usefulFunctionA(): string;
}

// 具体产品A1
class ConcreteProductA1 implements AbstractProductA {
  public usefulFunctionA(): string {
    return '具体产品A1的结果';
  }
}

// 具体产品A2
class ConcreteProductA2 implements AbstractProductA {
  public usefulFunctionA(): string {
    return '具体产品A2的结果';
  }
}

// 抽象产品B
interface AbstractProductB {
  usefulFunctionB(): string;
  anotherUsefulFunctionB(collaborator: AbstractProductA): string;
}

// 具体产品B1
class ConcreteProductB1 implements AbstractProductB {
  public usefulFunctionB(): string {
    return '具体产品B1的结果';
  }
  
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `具体产品B1与${result}协作`;
  }
}

// 具体产品B2
class ConcreteProductB2 implements AbstractProductB {
  public usefulFunctionB(): string {
    return '具体产品B2的结果';
  }
  
  public anotherUsefulFunctionB(collaborator: AbstractProductA): string {
    const result = collaborator.usefulFunctionA();
    return `具体产品B2与${result}协作`;
  }
}

// 抽象工厂
interface AbstractFactory {
  createProductA(): AbstractProductA;
  createProductB(): AbstractProductB;
}

// 具体工厂1
class ConcreteFactory1 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA1();
  }
  
  public createProductB(): AbstractProductB {
    return new ConcreteProductB1();
  }
}

// 具体工厂2
class ConcreteFactory2 implements AbstractFactory {
  public createProductA(): AbstractProductA {
    return new ConcreteProductA2();
  }
  
  public createProductB(): AbstractProductB {
    return new ConcreteProductB2();
  }
}

// 使用
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();
  
  console.log(productB.usefulFunctionB());
  console.log(productB.anotherUsefulFunctionB(productA));
}

console.log('客户端使用工厂1:');
clientCode(new ConcreteFactory1());

console.log('客户端使用工厂2:');
clientCode(new ConcreteFactory2());
```

### 建造者模式（Builder Pattern）

建造者模式将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

**核心思想**：将复杂对象的构建过程分解为多个简单步骤，然后通过组合这些步骤来构建复杂对象。

**适用场景**：
- 当创建复杂对象的算法应该独立于该对象的组成部分以及它们的装配方式时
- 当构造过程必须允许被构造的对象有不同表示时

**实现示例**：

```javascript
// 产品类
class Product {
  private parts: string[] = [];
  
  public add(part: string): void {
    this.parts.push(part);
  }
  
  public listParts(): void {
    console.log(`产品部件: ${this.parts.join(', ')}`);
  }
}

// 建造者接口
interface Builder {
  reset(): void;
  buildPartA(): void;
  buildPartB(): void;
  buildPartC(): void;
  getResult(): Product;
}

// 具体建造者
class ConcreteBuilder implements Builder {
  private product: Product;
  
  constructor() {
    this.reset();
  }
  
  public reset(): void {
    this.product = new Product();
  }
  
  public buildPartA(): void {
    this.product.add('部件A');
  }
  
  public buildPartB(): void {
    this.product.add('部件B');
  }
  
  public buildPartC(): void {
    this.product.add('部件C');
  }
  
  public getResult(): Product {
    const result = this.product;
    this.reset(); // 重置，为下一个产品做准备
    return result;
  }
}

// 指挥者
class Director {
  private builder: Builder;
  
  public setBuilder(builder: Builder): void {
    this.builder = builder;
  }
  
  // 构建最小产品
  public buildMinimalViableProduct(): void {
    this.builder.buildPartA();
  }
  
  // 构建完整产品
  public buildFullFeaturedProduct(): void {
    this.builder.buildPartA();
    this.builder.buildPartB();
    this.builder.buildPartC();
  }
}

// 使用
function clientCode(director: Director) {
  const builder = new ConcreteBuilder();
  director.setBuilder(builder);
  
  console.log('标准基础产品:');
  director.buildMinimalViableProduct();
  builder.getResult().listParts();
  
  console.log('标准完整产品:');
  director.buildFullFeaturedProduct();
  builder.getResult().listParts();
  
  // 不使用指挥者，直接使用建造者创建自定义产品
  console.log('自定义产品:');
  builder.buildPartA();
  builder.buildPartC();
  builder.getResult().listParts();
}

const director = new Director();
clientCode(director);
```

### 原型模式（Prototype Pattern）

原型模式用原型实例指定创建对象的种类，并且通过复制这些原型创建新的对象。

**核心思想**：通过复制现有对象来创建新对象，而不是通过实例化新的类。

**适用场景**：
- 当一个系统应该独立于它的产品创建、构成和表示时
- 当要实例化的类是在运行时刻指定时，例如，通过动态装载
- 为了避免创建一个与产品类层次平行的工厂类层次时
- 当一个类的实例只能有几个不同状态组合中的一种时，建立相应数目的原型并克隆它们可能比每次用合适的状态手工实例化该类更方便

**实现示例**：

```javascript
// 原型接口
interface Prototype {
  clone(): Prototype;
}

// 具体原型
class ConcretePrototype1 implements Prototype {
  private field: string;
  
  constructor(field: string) {
    this.field = field;
  }
  
  public clone(): Prototype {
    return new ConcretePrototype1(this.field);
  }
  
  public setField(field: string): void {
    this.field = field;
  }
  
  public getField(): string {
    return this.field;
  }
}

// 具体原型2
class ConcretePrototype2 implements Prototype {
  private field1: string;
  private field2: number;
  
  constructor(field1: string, field2: number) {
    this.field1 = field1;
    this.field2 = field2;
  }
  
  public clone(): Prototype {
    return new ConcretePrototype2(this.field1, this.field2);
  }
  
  public getInfo(): string {
    return `${this.field1}, ${this.field2}`;
  }
}

// 原型管理器
class PrototypeManager {
  private prototypes: Map<string, Prototype> = new Map();
  
  public add(key: string, prototype: Prototype): void {
    this.prototypes.set(key, prototype);
  }
  
  public get(key: string): Prototype | undefined {
    const prototype = this.prototypes.get(key);
    return prototype ? prototype.clone() : undefined;
  }
}

// 使用
const manager = new PrototypeManager();

const prototype1 = new ConcretePrototype1('原型1');
manager.add('prototype1', prototype1);

const prototype2 = new ConcretePrototype2('原型2', 42);
manager.add('prototype2', prototype2);

// 克隆原型
const clone1 = manager.get('prototype1') as ConcretePrototype1;
console.log(clone1.getField()); // 输出: 原型1

const clone2 = manager.get('prototype2') as ConcretePrototype2;
console.log(clone2.getInfo()); // 输出: 原型2, 42

// 修改克隆对象不会影响原型对象
clone1.setField('修改后的原型1');
console.log(clone1.getField()); // 输出: 修改后的原型1
console.log(prototype1.getField()); // 输出: 原型1
```

### 适配器模式（Adapter Pattern）

适配器模式将一个类的接口转换成客户希望的另一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

**核心思想**：通过一个适配器类，将一个类的接口转换为客户端所期望的接口。

**适用场景**：
- 当系统需要使用现有的类，而这些类的接口不符合系统的需要时
- 当想要创建一个可以复用的类，该类可以与其他不相关的类或不可预见的类（即那些接口可能不一定兼容的类）协同工作时
- 当需要一个统一的输出接口，而输入端的类型不可预知时

**实现示例**：

```javascript
// 目标接口
interface Target {
  request(): string;
}

// 适配者（被适配的类）
class Adaptee {
  public specificRequest(): string {
    return '.eetpadA eht fo roivaheb laicepS';
  }
}

// 适配器
class Adapter implements Target {
  private adaptee: Adaptee;
  
  constructor(adaptee: Adaptee) {
    this.adaptee = adaptee;
  }
  
  public request(): string {
    // 调用适配者的方法，并进行适当的转换
    const result = this.adaptee.specificRequest().split('').reverse().join('');
    return `适配器: (转换后) ${result}`;
  }
}

// 客户端代码
function clientCode(target: Target) {
  console.log(target.request());
}

console.log('客户端直接使用目标接口:');
const target = { request: () => '目标接口的标准请求' };
clientCode(target);

console.log('客户端通过适配器使用适配者:');
const adaptee = new Adaptee();
const adapter = new Adapter(adaptee);
clientCode(adapter);
```

### 桥接模式（Bridge Pattern）

桥接模式将抽象部分与实现部分分离，使它们都可以独立地变化。

**核心思想**：将抽象和实现解耦，使它们可以独立变化。

**适用场景**：
- 当一个类存在两个独立变化的维度，且这两个维度都需要进行扩展时
- 当一个系统不希望使用继承或因为多层次继承导致系统类的个数急剧增加时
- 当一个系统需要在构件的抽象化角色和具体化角色之间增加更多的灵活性时

**实现示例**：

```javascript
// 实现部分接口
interface Implementation {
  operationImplementation(): string;
}

// 具体实现A
class ConcreteImplementationA implements Implementation {
  public operationImplementation(): string {
    return '具体实现A的操作';
  }
}

// 具体实现B
class ConcreteImplementationB implements Implementation {
  public operationImplementation(): string {
    return '具体实现B的操作';
  }
}

// 抽象部分
abstract class Abstraction {
  protected implementation: Implementation;
  
  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }
  
  public abstract operation(): string;
}

// 扩展抽象部分
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    return `扩展抽象: ${this.implementation.operationImplementation()}`;
  }
}

// 使用
function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}

let implementation = new ConcreteImplementationA();
let abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);

console.log('');

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
```

### 组合模式（Composite Pattern）

组合模式将对象组合成树形结构以表示"部分-整体"的层次结构，使得客户端对单个对象和组合对象的使用具有一致性。

**核心思想**：将对象组合成树形结构，并提供统一的接口，使得客户端可以一致地处理单个对象和组合对象。

**适用场景**：
- 当需要表示对象的部分-整体层次结构时
- 当希望客户端忽略组合对象与单个对象的差异，客户端将统一地使用组合结构中的所有对象时

**实现示例**：

```javascript
// 组件接口
interface Component {
  operation(): string;
  add?(component: Component): void;
  remove?(component: Component): void;
  getChild?(index: number): Component | null;
}

// 叶节点
class Leaf implements Component {
  private name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  public operation(): string {
    return this.name;
  }
}

// 组合节点
class Composite implements Component {
  private name: string;
  private children: Component[] = [];
  
  constructor(name: string) {
    this.name = name;
  }
  
  public add(component: Component): void {
    this.children.push(component);
  }
  
  public remove(component: Component): void {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }
  
  public getChild(index: number): Component | null {
    return this.children[index] || null;
  }
  
  public operation(): string {
    const results = [];
    results.push(this.name);
    for (const child of this.children) {
      results.push(`  ${child.operation()}`);
    }
    return results.join('\n');
  }
}

// 使用
function clientCode(component: Component) {
  console.log(`结果: ${component.operation()}`);
}

console.log('客户端使用叶节点:');
const leaf = new Leaf('叶节点A');
clientCode(leaf);

console.log('\n客户端使用组合节点:');
const tree = new Composite('根节点');
const branch1 = new Composite('分支1');
branch1.add(new Leaf('叶节点B1'));
branch1.add(new Leaf('叶节点B2'));

const branch2 = new Composite('分支2');
branch2.add(new Leaf('叶节点C1'));

branch1.add(branch2);
tree.add(branch1);
tree.add(new Leaf('叶节点A'));

console.log('完整树结构:');
console.log(tree.operation());
```

### 装饰器模式（Decorator Pattern）

装饰器模式动态地给一个对象添加一些额外的职责，就增加功能来说，装饰器模式比生成子类更为灵活。

**核心思想**：通过组合而非继承的方式，动态地为对象添加额外的功能。

**适用场景**：
- 当需要给一个对象添加一些额外的职责，而且这些职责可以动态地添加和删除时
- 当需要通过对现有的类进行扩展，而这种扩展会产生大量的子类时
- 当需要在不影响其他对象的情况下，以动态、透明的方式给单个对象添加职责时

**实现示例**：

```javascript
// 组件接口
interface Component {
  operation(): string;
}

// 具体组件
class ConcreteComponent implements Component {
  public operation(): string {
    return '具体组件';
  }
}

// 装饰器抽象类
abstract class Decorator implements Component {
  protected component: Component;
  
  constructor(component: Component) {
    this.component = component;
  }
  
  public operation(): string {
    return this.component.operation();
  }
}

// 具体装饰器A
class ConcreteDecoratorA extends Decorator {
  public operation(): string {
    return `具体装饰器A(${super.operation()})`;
  }
}

// 具体装饰器B
class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `具体装饰器B(${super.operation()})`;
  }
}

// 使用
function clientCode(component: Component) {
  console.log(component.operation());
}

console.log('客户端使用具体组件:');
const simple = new ConcreteComponent();
clientCode(simple);

console.log('\n客户端使用装饰后的组件:');
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
clientCode(decorator2);
```

### 外观模式（Facade Pattern）

外观模式为子系统中的一组接口提供一个一致的界面，此模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。

**核心思想**：提供一个简单的接口，隐藏子系统的复杂性，使得客户端可以更加容易地使用子系统。

**适用场景**：
- 当需要为一个复杂的子系统提供一个简单的接口时
- 当客户端与子系统之间存在很大的依赖性时
- 当需要构建一个层次结构的子系统时

**实现示例**：

```javascript
// 子系统类A
class SubsystemA {
  public operationA1(): string {
    return '子系统A，操作1\n';
  }
  
  public operationA2(): string {
    return '子系统A，操作2\n';
  }
}

// 子系统类B
class SubsystemB {
  public operationB1(): string {
    return '子系统B，操作1\n';
  }
  
  public operationB2(): string {
    return '子系统B，操作2\n';
  }
}

// 子系统类C
class SubsystemC {
  public operationC1(): string {
    return '子系统C，操作1\n';
  }
  
  public operationC2(): string {
    return '子系统C，操作2\n';
  }
}

// 外观类
class Facade {
  protected subsystemA: SubsystemA;
  protected subsystemB: SubsystemB;
  protected subsystemC: SubsystemC;
  
  constructor(subsystemA?: SubsystemA, subsystemB?: SubsystemB, subsystemC?: SubsystemC) {
    this.subsystemA = subsystemA || new SubsystemA();
    this.subsystemB = subsystemB || new SubsystemB();
    this.subsystemC = subsystemC || new SubsystemC();
  }
  
  // 外观方法，隐藏子系统的复杂性
  public operation1(): string {
    let result = '外观执行操作1:\n';
    result += this.subsystemA.operationA1();
    result += this.subsystemB.operationB1();
    result += this.subsystemC.operationC1();
    return result;
  }
  
  public operation2(): string {
    let result = '外观执行操作2:\n';
    result += this.subsystemA.operationA2();
    result += this.subsystemB.operationB2();
    result += this.subsystemC.operationC2();
    return result;
  }
}

// 使用
function clientCode(facade: Facade) {
  console.log(facade.operation1());
  console.log(facade.operation2());
}

console.log('客户端通过外观使用子系统:');
const facade = new Facade();
clientCode(facade);

console.log('\n客户端也可以直接使用子系统:');
const subsystemA = new SubsystemA();
const subsystemB = new SubsystemB();
console.log(subsystemA.operationA1());
console.log(subsystemB.operationB1());
```

### 享元模式（Flyweight Pattern）

享元模式运用共享技术有效地支持大量细粒度的对象。

**核心思想**：通过共享对象来减少内存使用和提高性能。

**适用场景**：
- 当一个应用程序使用了大量的对象，而这些对象造成了很大的内存开销时
- 当对象的大多数状态可以外部化时
- 当可以将对象的状态分为内部状态和外部状态，并且内部状态可以共享时

**实现示例**：

```javascript
// 享元接口
interface Flyweight {
  operation(extrinsicState: string): void;
}

// 具体享元
class ConcreteFlyweight implements Flyweight {
  private intrinsicState: string;
  
  constructor(intrinsicState: string) {
    this.intrinsicState = intrinsicState;
  }
  
  public operation(extrinsicState: string): void {
    console.log(`具体享元: 内部状态=${this.intrinsicState}, 外部状态=${extrinsicState}`);
  }
}

// 享元工厂
class FlyweightFactory {
  private flyweights: Map<string, Flyweight> = new Map();
  
  // 获取享元对象，如果不存在则创建
  public getFlyweight(key: string): Flyweight {
    if (!this.flyweights.has(key)) {
      this.flyweights.set(key, new ConcreteFlyweight(key));
    }
    return this.flyweights.get(key)!;
  }
  
  // 获取享元对象的数量
  public getFlyweightCount(): number {
    return this.flyweights.size;
  }
}

// 使用
function clientCode() {
  const factory = new FlyweightFactory();
  
  // 客户端代码通常会维护外部状态
  const extrinsicStates = ['A', 'B', 'C', 'A', 'B'];
  
  for (const state of extrinsicStates) {
    const flyweight = factory.getFlyweight(state);
    flyweight.operation(`客户端-${Math.random().toFixed(2)}`);
  }
  
  console.log(`\n享元对象数量: ${factory.getFlyweightCount()}`);
}

clientCode();
```

### 代理模式（Proxy Pattern）

代理模式为其他对象提供一种代理以控制对这个对象的访问。

**核心思想**：通过代理对象控制对真实对象的访问。

**适用场景**：
- 当需要在访问一个对象之前或之后执行一些操作时
- 当需要控制对对象的访问权限时
- 当需要延迟加载一个对象时

**实现示例**：

```javascript
// 主题接口
interface Subject {
  request(): void;
}

// 真实主题
class RealSubject implements Subject {
  public request(): void {
    console.log('真实主题: 处理请求');
  }
}

// 代理
class Proxy implements Subject {
  private realSubject: RealSubject;
  
  constructor(realSubject: RealSubject) {
    this.realSubject = realSubject;
  }
  
  // 预处理
  private preRequest(): void {
    console.log('代理: 请求前的预处理');
  }
  
  // 后处理
  private postRequest(): void {
    console.log('代理: 请求后的处理');
  }
  
  public request(): void {
    this.preRequest();
    this.realSubject.request();
    this.postRequest();
  }
}

// 使用
function clientCode(subject: Subject) {
  subject.request();
}

console.log('客户端直接使用真实主题:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('\n客户端使用代理:');
const proxy = new Proxy(realSubject);
clientCode(proxy);
```

### 责任链模式（Chain of Responsibility Pattern）

责任链模式为请求创建了一个接收者对象的链，对请求的发送者和接收者进行解耦。

**核心思想**：将请求沿着一条链传递，直到有一个对象处理它为止。

**适用场景**：
- 当有多个对象可以处理一个请求，而处理器是动态确定的时
- 当你想在不明确指定接收者的情况下，向多个对象中的一个提交一个请求时
- 当你想让请求的发送者和接收者解耦时

**实现示例**：

```javascript
// 处理者接口
interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): string | null;
}

// 抽象处理者
abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;
  
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }
  
  public handle(request: string): string | null {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}

// 具体处理者A
class ConcreteHandlerA extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'A') {
      return `处理者A处理了请求: ${request}`;
    }
    return super.handle(request);
  }
}

// 具体处理者B
class ConcreteHandlerB extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'B') {
      return `处理者B处理了请求: ${request}`;
    }
    return super.handle(request);
  }
}

// 具体处理者C
class ConcreteHandlerC extends AbstractHandler {
  public handle(request: string): string | null {
    if (request === 'C') {
      return `处理者C处理了请求: ${request}`;
    }
    return super.handle(request);
  }
}

// 使用
function clientCode(handler: Handler) {
  const requests = ['A', 'B', 'C', 'D'];
  
  for (const request of requests) {
    console.log(`\n客户端: 谁来处理请求 ${request}?`);
    const result = handler.handle(request);
    if (result) {
      console.log(`  ${result}`);
    } else {
      console.log(`  请求 ${request} 未被处理`);
    }
  }
}

const handlerA = new ConcreteHandlerA();
const handlerB = new ConcreteHandlerB();
const handlerC = new ConcreteHandlerC();

// 构建责任链
handlerA.setNext(handlerB).setNext(handlerC);

console.log('责任链: A > B > C');
clientCode(handlerA);

console.log('\n责任链: B > C');
clientCode(handlerB);
```

### 命令模式（Command Pattern）

命令模式将请求封装为一个对象，从而使用户可以用不同的请求参数化客户端，对请求排队或记录请求日志，以及支持可撤销的操作。

**核心思想**：将请求封装为对象，使得请求的发送者和接收者解耦。

**适用场景**：
- 当需要将请求参数化时
- 当需要将请求排队或记录请求日志时
- 当需要支持可撤销的操作时
- 当需要将操作的发送者和接收者解耦时

**实现示例**：

```javascript
// 命令接口
interface Command {
  execute(): void;
  undo(): void;
}

// 接收者
class Receiver {
  public doSomething(action: string): void {
    console.log(`接收者: 执行${action}`);
  }
  
  public undoSomething(action: string): void {
    console.log(`接收者: 撤销${action}`);
  }
}

// 具体命令
class ConcreteCommand implements Command {
  private receiver: Receiver;
  private action: string;
  
  constructor(receiver: Receiver, action: string) {
    this.receiver = receiver;
    this.action = action;
  }
  
  public execute(): void {
    this.receiver.doSomething(this.action);
  }
  
  public undo(): void {
    this.receiver.undoSomething(this.action);
  }
}

// 调用者
class Invoker {
  private onStart: Command | null = null;
  private onFinish: Command | null = null;
  private history: Command[] = [];
  
  public setOnStart(command: Command): void {
    this.onStart = command;
  }
  
  public setOnFinish(command: Command): void {
    this.onFinish = command;
  }
  
  public executeCommands(): void {
    console.log('调用者: 开始前准备工作');
    if (this.onStart) {
      this.onStart.execute();
      this.history.push(this.onStart);
    }
    
    console.log('调用者: 执行主要工作');
    
    console.log('调用者: 完成后收尾工作');
    if (this.onFinish) {
      this.onFinish.execute();
      this.history.push(this.onFinish);
    }
  }
  
  public undoLast(): void {
    const command = this.history.pop();
    if (command) {
      console.log('调用者: 撤销最后一个命令');
      command.undo();
    }
  }
}

// 使用
const receiver = new Receiver();
const startCommand = new ConcreteCommand(receiver, '开始操作');
const finishCommand = new ConcreteCommand(receiver, '结束操作');

const invoker = new Invoker();
invoker.setOnStart(startCommand);
invoker.setOnFinish(finishCommand);

console.log('客户端: 执行命令序列');
invoker.executeCommands();

console.log('\n客户端: 撤销最后一个命令');
invoker.undoLast();
```

### 解释器模式（Interpreter Pattern）

解释器模式定义了一个语言的语法，并且建立一个解释器来解释该语言中的表达式。

**核心思想**：定义语言的语法，并为其构建解释器。

**适用场景**：
- 当语言的语法相对简单时
- 当有一个语言需要解释执行，并且语言中的句子可以表示为一个抽象语法树时
- 当需要解释或执行一个简单的语言或表达式时

**实现示例**：

```javascript
// 抽象表达式
interface Expression {
  interpret(context: string): boolean;
}

// 终结表达式 - 单词
class TerminalExpression implements Expression {
  private data: string;
  
  constructor(data: string) {
    this.data = data;
  }
  
  public interpret(context: string): boolean {
    return context.includes(this.data);
  }
}

// 非终结表达式 - AND
class AndExpression implements Expression {
  private expr1: Expression;
  private expr2: Expression;
  
  constructor(expr1: Expression, expr2: Expression) {
    this.expr1 = expr1;
    this.expr2 = expr2;
  }
  
  public interpret(context: string): boolean {
    return this.expr1.interpret(context) && this.expr2.interpret(context);
  }
}

// 非终结表达式 - OR
class OrExpression implements Expression {
  private expr1: Expression;
  private expr2: Expression;
  
  constructor(expr1: Expression, expr2: Expression) {
    this.expr1 = expr1;
    this.expr2 = expr2;
  }
  
  public interpret(context: string): boolean {
    return this.expr1.interpret(context) || this.expr2.interpret(context);
  }
}

// 使用
function clientCode() {
  // 创建一些终结表达式
  const robert = new TerminalExpression('Robert');
  const john = new TerminalExpression('John');
  
  // 创建非终结表达式 - OR
  const orExpression = new OrExpression(robert, john);
  
  // 创建一些终结表达式
  const julie = new TerminalExpression('Julie');
  const married = new TerminalExpression('Married');
  
  // 创建非终结表达式 - AND
  const andExpression = new AndExpression(julie, married);
  
  console.log(`'Robert'是男性? ${orExpression.interpret('Robert')}`);
  console.log(`'John'是男性? ${orExpression.interpret('John')}`);
  console.log(`'Alice'是男性? ${orExpression.interpret('Alice')}`);
  
  console.log(`'Julie是Married'? ${andExpression.interpret('Married Julie')}`);
  console.log(`'Robert是Married'? ${andExpression.interpret('Married Robert')}`);
}

clientCode();
```

### 迭代器模式（Iterator Pattern）

迭代器模式提供一种方法来访问一个容器对象中的各个元素，而不需要暴露该对象的内部表示。

**核心思想**：提供一个统一的方法来访问聚合对象中的元素，而不暴露其内部结构。

**适用场景**：
- 当需要访问一个聚合对象的内容而无需暴露其内部表示时
- 当需要为聚合对象提供多种遍历方式时
- 当需要为遍历不同的聚合结构提供一个统一的接口时

**实现示例**：

```javascript
// 迭代器接口
interface Iterator<T> {
  hasNext(): boolean;
  next(): T | null;
}

// 聚合接口
interface Aggregator<T> {
  createIterator(): Iterator<T>;
}

// 具体迭代器
class ConcreteIterator<T> implements Iterator<T> {
  private collection: T[];
  private position: number = 0;
  
  constructor(collection: T[]) {
    this.collection = collection;
  }
  
  public hasNext(): boolean {
    return this.position < this.collection.length;
  }
  
  public next(): T | null {
    if (this.hasNext()) {
      return this.collection[this.position++];
    }
    return null;
  }
}

// 具体聚合
class ConcreteAggregate<T> implements Aggregator<T> {
  private items: T[] = [];
  
  public addItem(item: T): void {
    this.items.push(item);
  }
  
  public createIterator(): Iterator<T> {
    return new ConcreteIterator(this.items);
  }
}

// 使用
function clientCode() {
  const aggregate = new ConcreteAggregate<string>();
  aggregate.addItem('项目1');
  aggregate.addItem('项目2');
  aggregate.addItem('项目3');
  aggregate.addItem('项目4');
  
  console.log('遍历聚合对象:');
  const iterator = aggregate.createIterator();
  while (iterator.hasNext()) {
    console.log(iterator.next());
  }
}

clientCode();
```

### 中介者模式（Mediator Pattern）

中介者模式用一个中介对象来封装一系列的对象交互，中介者使各对象之间不需要显式地相互引用，从而降低耦合度，而且可以独立地改变它们之间的交互。

**核心思想**：通过中介者对象来封装对象之间的交互，使对象之间解耦。

**适用场景**：
- 当对象之间存在复杂的引用关系，导致它们之间的依赖关系难以理解和维护时
- 当一个对象的行为影响到其他很多对象时
- 当希望减少对象之间的直接通信，从而降低系统的耦合度时

**实现示例**：

```javascript
// 中介者接口
interface Mediator {
  notify(sender: object, event: string): void;
}

// 具体中介者
class ConcreteMediator implements Mediator {
  private component1: Component1;
  private component2: Component2;
  
  constructor(component1: Component1, component2: Component2) {
    this.component1 = component1;
    this.component2 = component2;
    
    this.component1.setMediator(this);
    this.component2.setMediator(this);
  }
  
  public notify(sender: object, event: string): void {
    if (event === 'A') {
      console.log('中介者对A事件的反应:');
      this.component2.doC();
    } else if (event === 'D') {
      console.log('中介者对D事件的反应:');
      this.component1.doB();
      this.component2.doC();
    }
  }
}

// 基础组件类
class BaseComponent {
  protected mediator: Mediator | null = null;
  
  constructor(mediator?: Mediator) {
    this.mediator = mediator || null;
  }
  
  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}

// 具体组件1
class Component1 extends BaseComponent {
  public doA(): void {
    console.log('组件1: 执行A');
    this.mediator?.notify(this, 'A');
  }
  
  public doB(): void {
    console.log('组件1: 执行B');
  }
}

// 具体组件2
class Component2 extends BaseComponent {
  public doC(): void {
    console.log('组件2: 执行C');
  }
  
  public doD(): void {
    console.log('组件2: 执行D');
    this.mediator?.notify(this, 'D');
  }
}

// 使用
function clientCode() {
  const component1 = new Component1();
  const component2 = new Component2();
  const mediator = new ConcreteMediator(component1, component2);
  
  console.log('客户端触发组件1的操作A:');
  component1.doA();
  
  console.log('\n客户端触发组件2的操作D:');
  component2.doD();
}

clientCode();
```

### 备忘录模式（Memento Pattern）

备忘录模式在不破坏封装性的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，以便恢复到原先保存的状态。

**核心思想**：在不破坏封装的前提下，保存和恢复对象的内部状态。

**适用场景**：
- 当需要保存一个对象在某一时刻的状态，以便在将来恢复到该状态时
- 当需要避免暴露对象的内部实现细节，而同时又允许外部对象访问其内部状态时

**实现示例**：

```javascript
// 备忘录类
class Memento {
  private state: string;
  
  constructor(state: string) {
    this.state = state;
  }
  
  public getState(): string {
    return this.state;
  }
}

// 发起人（Originator）
class Originator {
  private state: string;
  
  constructor(state: string) {
    this.state = state;
    console.log(`发起人: 初始状态为: ${state}`);
  }
  
  public doSomething(): void {
    this.state = this.generateRandomString(30);
    console.log(`发起人: 状态已更改为: ${this.state}`);
  }
  
  private generateRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  // 创建备忘录
  public saveToMemento(): Memento {
    console.log(`发起人: 保存状态到备忘录`);
    return new Memento(this.state);
  }
  
  // 从备忘录恢复
  public restoreFromMemento(memento: Memento): void {
    this.state = memento.getState();
    console.log(`发起人: 状态已恢复为: ${this.state}`);
  }
}

// 管理者（Caretaker）
class Caretaker {
  private mementos: Memento[] = [];
  private originator: Originator;
  
  constructor(originator: Originator) {
    this.originator = originator;
  }
  
  public backup(): void {
    console.log('管理者: 备份发起人状态');
    this.mementos.push(this.originator.saveToMemento());
  }
  
  public undo(): void {
    if (this.mementos.length === 0) {
      return;
    }
    
    const memento = this.mementos.pop();
    if (memento) {
      console.log('管理者: 恢复到上一个状态');
      this.originator.restoreFromMemento(memento);
    }
  }
  
  public showHistory(): void {
    console.log('管理者: 历史记录:');
    for (const memento of this.mementos) {
      console.log(memento.getState());
    }
  }
}

// 使用
function clientCode() {
  const originator = new Originator('Super-duper-super-puper-super');
  const caretaker = new Caretaker(originator);
  
  caretaker.backup();
  originator.doSomething();
  
  caretaker.backup();
  originator.doSomething();
  
  caretaker.backup();
  originator.doSomething();
  
  console.log('\n');
  caretaker.showHistory();
  
  console.log('\n客户端: 执行撤销操作...');
  caretaker.undo();
  
  console.log('\n客户端: 再次执行撤销操作...');
  caretaker.undo();
}

clientCode();
```

### 观察者模式（Observer Pattern）

观察者模式定义了对象之间的一对多依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都会得到通知并自动更新。

**核心思想**：定义对象之间的一对多依赖关系，使得当一个对象状态改变时，所有依赖它的对象都会被通知并自动更新。

**适用场景**：
- 当一个对象的改变需要同时改变其他对象时
- 当一个对象必须通知其他对象，而又不希望这些对象与自己紧密耦合时

**实现示例**：

```javascript
// 观察者接口
interface Observer {
  update(subject: Subject): void;
}

// 主题接口
interface Subject {
  attach(observer: Observer): void;
  detach(observer: Observer): void;
  notify(): void;
}

// 具体主题
class ConcreteSubject implements Subject {
  private observers: Observer[] = [];
  private state: number = 0;
  
  public getState(): number {
    return this.state;
  }
  
  public setState(state: number): void {
    this.state = state;
    this.notify();
  }
  
  public attach(observer: Observer): void {
    if (this.observers.includes(observer)) {
      return;
    }
    this.observers.push(observer);
  }
  
  public detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }
  
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}

// 具体观察者A
class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.getState() < 3) {
      console.log('具体观察者A: 收到通知并更新');
    }
  }
}

// 具体观察者B
class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && (subject.getState() === 0 || subject.getState() >= 2)) {
      console.log('具体观察者B: 收到通知并更新');
    }
  }
}

// 使用
function clientCode() {
  const subject = new ConcreteSubject();
  const observerA = new ConcreteObserverA();
  subject.attach(observerA);
  
  const observerB = new ConcreteObserverB();
  subject.attach(observerB);
  
  console.log('将状态设置为1:');
  subject.setState(1);
  
  console.log('\n将状态设置为2:');
  subject.setState(2);
  
  console.log('\n移除观察者A:');
  subject.detach(observerA);
  
  console.log('\n将状态设置为3:');
  subject.setState(3);
}

clientCode();
```

### 状态模式（State Pattern）

状态模式允许对象在内部状态改变时改变其行为，对象看起来好像修改了它的类。

**核心思想**：将对象的行为封装到不同的状态对象中，使得对象在不同状态下有不同的行为。

**适用场景**：
- 当一个对象的行为取决于它的状态，并且它必须在运行时根据状态改变它的行为时
- 当一个操作中含有庞大的条件分支语句，这些分支依赖于对象的状态时

**实现示例**：

```javascript
// 状态接口
interface State {
  handle(context: Context): void;
}

// 具体状态A
class ConcreteStateA implements State {
  public handle(context: Context): void {
    console.log('当前状态是A');
    console.log('处理请求并切换到状态B');
    context.setState(new ConcreteStateB());
  }
}

// 具体状态B
class ConcreteStateB implements State {
  public handle(context: Context): void {
    console.log('当前状态是B');
    console.log('处理请求并切换到状态A');
    context.setState(new ConcreteStateA());
  }
}

// 上下文类
class Context {
  private state: State;
  
  constructor(state: State) {
    this.state = state;
    console.log(`初始状态: ${this.state.constructor.name}`);
  }
  
  public setState(state: State): void {
    this.state = state;
    console.log(`状态已变更为: ${this.state.constructor.name}`);
  }
  
  public request(): void {
    this.state.handle(this);
  }
}

// 使用
function clientCode() {
  const context = new Context(new ConcreteStateA());
  
  console.log('\n客户端请求1:');
  context.request();
  
  console.log('\n客户端请求2:');
  context.request();
  
  console.log('\n客户端请求3:');
  context.request();
}

clientCode();
```

### 策略模式（Strategy Pattern）

策略模式定义了一系列算法，将每个算法封装起来，并使它们可以互相替换，策略模式让算法的变化独立于使用算法的客户。

**核心思想**：定义一系列算法，将它们封装起来，并使它们可以互相替换。

**适用场景**：
- 当需要在运行时选择算法的具体实现时
- 当一个类定义了多种行为，并且这些行为在这个类的操作中以多个条件语句的形式出现时

**实现示例**：

```javascript
// 策略接口
interface Strategy {
  execute(a: number, b: number): number;
}

// 具体策略A - 加法
class ConcreteStrategyAdd implements Strategy {
  public execute(a: number, b: number): number {
    return a + b;
  }
}

// 具体策略B - 减法
class ConcreteStrategySubtract implements Strategy {
  public execute(a: number, b: number): number {
    return a - b;
  }
}

// 具体策略C - 乘法
class ConcreteStrategyMultiply implements Strategy {
  public execute(a: number, b: number): number {
    return a * b;
  }
}

// 上下文类
class Context {
  private strategy: Strategy;
  
  constructor(strategy: Strategy) {
    this.strategy = strategy;
  }
  
  public setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }
  
  public executeStrategy(a: number, b: number): number {
    return this.strategy.execute(a, b);
  }
}

// 使用
function clientCode() {
  const context = new Context(new ConcreteStrategyAdd());
  
  console.log('10 + 5 =', context.executeStrategy(10, 5));
  
  console.log('10 - 5 =', context.executeStrategy(10, 5));
  
  context.setStrategy(new ConcreteStrategyMultiply());
  console.log('10 * 5 =', context.executeStrategy(10, 5));
}

clientCode();
```

### 模板方法模式（Template Method Pattern）

模板方法模式定义了一个算法的骨架，将一些步骤延迟到子类中实现。

**核心思想**：定义一个算法的骨架，而将一些步骤延迟到子类中实现。

**适用场景**：
- 当有多个类的算法结构相似，但某些具体步骤不同时
- 当需要控制子类的扩展时

**实现示例**：

```javascript
// 抽象类
abstract class AbstractClass {
  // 模板方法，定义算法骨架
  public templateMethod(): void {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperations2();
    this.baseOperation3();
    this.hook2();
  }
  
  // 基类实现的方法
  protected baseOperation1(): void {
    console.log('抽象类: 执行基类操作1');
  }
  
  protected baseOperation2(): void {
    console.log('抽象类: 执行基类操作2');
  }
  
  protected baseOperation3(): void {
    console.log('抽象类: 执行基类操作3');
  }
  
  // 由子类实现的抽象方法
  protected abstract requiredOperations1(): void;
  protected abstract requiredOperations2(): void;
  
  // 钩子方法，子类可以选择性地覆盖
  protected hook1(): void {}
  protected hook2(): void {}
}

// 具体类1
class ConcreteClass1 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('具体类1: 实现操作1');
  }
  
  protected requiredOperations2(): void {
    console.log('具体类1: 实现操作2');
  }
}

// 具体类2
class ConcreteClass2 extends AbstractClass {
  protected requiredOperations1(): void {
    console.log('具体类2: 实现操作1');
  }
  
  protected requiredOperations2(): void {
    console.log('具体类2: 实现操作2');
  }
  
  // 覆盖钩子方法
  protected hook1(): void {
    console.log('具体类2: 覆盖钩子方法1');
  }
}

// 使用
function clientCode(abstractClass: AbstractClass) {
  console.log('客户端: 执行模板方法');
  abstractClass.templateMethod();
}

console.log('客户端使用具体类1:');
clientCode(new ConcreteClass1());

console.log('\n客户端使用具体类2:');
clientCode(new ConcreteClass2());
```

### 访问者模式（Visitor Pattern）

访问者模式表示一个作用于某对象结构中的各元素的操作，它使你可以在不改变各元素的类的前提下定义作用于这些元素的新操作。

**核心思想**：将数据结构与数据操作分离，通过访问者来实现对数据结构的不同操作。

**适用场景**：
- 当对象结构相对稳定，但操作多变时
- 当需要对对象结构中的元素进行多种不相关的操作，而又不希望这些操作"污染"元素的类时

**实现示例**：

```javascript
// 访问者接口
interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;
  visitConcreteComponentB(element: ConcreteComponentB): void;
}

// 组件接口
interface Component {
  accept(visitor: Visitor): void;
}

// 具体组件A
class ConcreteComponentA implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentA(this);
  }
  
  public exclusiveMethodOfConcreteComponentA(): string {
    return 'A';
  }
}

// 具体组件B
class ConcreteComponentB implements Component {
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentB(this);
  }
  
  public specialMethodOfConcreteComponentB(): string {
    return 'B';
  }
}

// 具体访问者1
class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(`${element.exclusiveMethodOfConcreteComponentA()} 被访问者1访问`);
  }
  
  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(`${element.specialMethodOfConcreteComponentB()} 被访问者1访问`);
  }
}

// 具体访问者2
class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(`${element.exclusiveMethodOfConcreteComponentA()} 被访问者2访问`);
  }
  
  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(`${element.specialMethodOfConcreteComponentB()} 被访问者2访问`);
  }
}

// 对象结构
class ObjectStructure {
  private components: Component[] = [];
  
  public attach(component: Component): void {
    this.components.push(component);
  }
  
  public detach(component: Component): void {
    const index = this.components.indexOf(component);
    if (index !== -1) {
      this.components.splice(index, 1);
    }
  }
  
  public accept(visitor: Visitor): void {
    for (const component of this.components) {
      component.accept(visitor);
    }
  }
}

// 使用
function clientCode() {
  const objectStructure = new ObjectStructure();
  objectStructure.attach(new ConcreteComponentA());
  objectStructure.attach(new ConcreteComponentB());
  
  const visitor1 = new ConcreteVisitor1();
  console.log('客户端使用访问者1:');
  objectStructure.accept(visitor1);
  
  console.log('\n客户端使用访问者2:');
  const visitor2 = new ConcreteVisitor2();
  objectStructure.accept(visitor2);
}

clientCode();
```

## 设计模式的优缺点

### 优点

- **提高代码复用性**：设计模式是经过验证的解决方案，可以在不同的项目中重复使用
- **提高代码可维护性**：设计模式使代码更加清晰、结构更加合理，从而更容易维护
- **提高代码可读性**：设计模式使用了标准化的术语和结构，使其他开发人员更容易理解代码
- **降低代码之间的耦合度**：设计模式通过封装、继承、组合等方式降低了代码之间的依赖关系
- **使代码更加灵活、易于扩展**：设计模式使代码能够适应变化，更容易进行扩展

### 缺点

- **增加了代码的复杂性**：使用设计模式可能会使简单的问题变得复杂
- **需要更多的学习成本**：设计模式需要开发人员花费时间学习和理解
- **可能导致过度设计**：有些开发人员可能会过度使用设计模式，导致代码变得更加复杂

## 设计模式的选择原则

在选择设计模式时，应该遵循以下原则：

- **不要为了使用模式而使用模式**：设计模式是解决问题的工具，而不是目的
- **理解问题后再选择模式**：在选择设计模式之前，应该先充分理解问题
- **考虑系统的可变性**：选择那些能够适应系统变化的设计模式
- **考虑团队的熟悉程度**：选择团队成员熟悉的设计模式，以减少学习成本
- **保持简单**：在能够解决问题的前提下，选择最简单的设计模式

## 总结

设计模式是软件设计中常见问题的通用解决方案，它可以帮助我们编写更加可复用、可维护、可读性强的代码。本文介绍了23种常见的设计模式，包括创建型模式、结构型模式和行为型模式，每种模式都提供了核心思想、适用场景和实现示例。

设计模式并不是银弹，不能解决所有的问题。在实际开发中，我们应该根据具体的问题和场景，选择合适的设计模式，并且避免过度设计。同时，我们也应该不断学习和实践，加深对设计模式的理解和应用。
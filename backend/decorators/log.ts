function log (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log('Before executing the function');
        const result = originalMethod.apply(this, args);
        console.log('After executing the function');
        return result;
    };

    return descriptor;
}

export default log;
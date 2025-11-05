import type { Context } from '@lit/context';

type ContextKey = string | symbol;

type Constructor<TInstance = object, TArgs extends any[] = any[]> = abstract new (...args: TArgs) => TInstance;

type ConfigurableRootInstance<TConfig, TBase extends Constructor> = InstanceType<TBase> & {
  initConfig?: string;
  config: TConfig;
  connectedCallback(): void;
};

type ConfigurableInstance<TConfig, TBase extends Constructor> = InstanceType<TBase> & {
  config: TConfig;
};

export interface ComponentBaseOptions<TBase extends Constructor = Constructor> {
  contextKey?: ContextKey;
  ExtendedClass: TBase;
}

export function createComponentBase<TConfig, TBase extends Constructor>(
  options: ComponentBaseOptions<TBase>,
): {
  configContext: Context<TConfig>;
  ComponentRoot: new (...args: ConstructorParameters<TBase>) => ConfigurableRootInstance<TConfig, TBase>;
  Component: new (...args: ConstructorParameters<TBase>) => ConfigurableInstance<TConfig, TBase>;
};

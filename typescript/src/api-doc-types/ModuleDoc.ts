import { Declaration } from 'typescript';
import { ModuleSymbol } from '../services/TsParser';
import { FileInfo } from '../services/TsParser/FileInfo';

import { ApiDoc } from './ApiDoc';
import { ExportDoc } from './ExportDoc';

/**
 * A module doc represents an ES6 module that contains exports such as classes, functions, constants, etc,
 * which are represented by docs of their own.
 */
export class ModuleDoc implements ApiDoc {
  docType = 'module';
  id = this.symbol.name.replace(/^"|"$/g, '').replace(/\/index$/, '');
  name = this.id.split('/').pop()!;
  declaration = this.symbol.valueDeclaration!;
  aliases = [this.id, this.name];
  exports: ExportDoc[] = [];
  path: string;
  outputPath: string;
  content: string;
  fileInfo = new FileInfo(this.declaration, this.basePath);

  constructor(public symbol: ModuleSymbol, private basePath: string) {}
}

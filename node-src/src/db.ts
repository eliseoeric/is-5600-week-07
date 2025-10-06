@@ -11,10 +11,6 @@ export interface Document extends MongooseDocument {
 */
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://root:example@db:27017/?authSource=admin',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

export const model = mongoose.model.bind(mongoose);


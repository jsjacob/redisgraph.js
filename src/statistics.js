/**
 * Different Statistics labels
 */
const Label = Object.freeze({
	LABELS_ADDED: "Labels added",
	NODES_CREATED: "Nodes created",
	NODES_DELETED: "Nodes deleted",
	RELATIONSHIPS_DELETED: "Relationships deleted",
	PROPERTIES_SET: "Properties set",
	RELATIONSHIPS_CREATED: "Relationships created",
	QUERY_INTERNAL_EXECUTION_TIME: "Query internal execution time"
});

module.exports ={
		Label: Label,
		Statistics : class Statistics {


			constructor(raw){
				this._raw = raw;
			}

			getStringValue(label) {
				return this.getStatistics()[label];
			}

			/**
			 * Return the query statistics
			 * 
			 * @return statistics object
			 */
			getStatistics(){
				if(!this._statistics) {
					this._statistics = {};
					for(let row of this._raw) {
						let touple = row.split(':');
						this._statistics[touple[0]] = touple[1].trim();
					}
				}
				return this._statistics;
			}

			getIntValue(label) {
				let value = this.getStringValue(label);
				return value ? parseInt(value) : 0;
			}
			
			getFloatValue(label) {
				let value = this.getStringValue(label);
				return value ? parseFloat(value) : 0;
			}


			nodesCreated() {
				return this.getIntValue(Label.NODES_CREATED);
			}

			nodesDeleted() {
				return this.getIntValue(Label.NODES_DELETED);
			}

			labelsAdded() {
				return this.getIntValue(Label.LABELS_ADDED);
			}

			relationshipsDeleted() {
				return this.getIntValue(Label.RELATIONSHIPS_DELETED);
			}

			relationshipsCreated() {
				return this.getIntValue(Label.RELATIONSHIPS_CREATED);
			}

			propertiesSet() {
				return this.getIntValue(Label.PROPERTIES_SET);
			}
			
			queryExecutionTime() {
				return this.getFloatValue(Label.QUERY_INTERNAL_EXECUTION_TIME);
			}

		}
}
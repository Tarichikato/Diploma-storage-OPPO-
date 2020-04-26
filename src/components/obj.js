<Table celled padded color ="yellow">
              <Table.Header>
                  <Table.Row>
                      <Table.HeaderCell>Name</Table.HeaderCell>
                      <Table.HeaderCell>Value</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>

              <Table.Body>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     Student
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.idStudent}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell ssigleline="true"> 
                     idStudent
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.idStudent}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     INE
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.INE}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     First Name 
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.firstName}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     Last Name
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.lastName}
                  </Table.Cell>
                  </Table.Row>

                  <Table.Row>
                  <Table.Cell sigleline="true"> 
                     Birthday 
                  </Table.Cell>
                  <Table.Cell sigleline="true">
                      {this.state.students.birth}
                  </Table.Cell>
                  </Table.Row>


              </Table.Body>
              
          </Table>
import React, { useState, useEffect } from 'react';
import {
  MDBBadge,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import DetailProfile from './detailprofile';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [contractData, setContractData] = useState([]);
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false); // State cho việc hiển thị modal
  const [contractDetail, setContractDetail] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/profile?email=${localStorage.getItem('mail')}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const data = await response.json();
        if (response.status === 200) {
          setUserData(data);
        } else {
          console.log("Get user data failed with status:", response.status);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchContractList = async () => {
      const email = localStorage.getItem('mail');
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:8080/request-contract/request-contract/list/email?email=${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          credentials: 'include'
        });
        if (response.status === 302) {
          // Xử lý redirect
          const redirectUrl = response.headers.get('Location');
          window.location.href = redirectUrl;
        }
        const contractList = await response.json();
        if (response.status === 200) {
          setContractData(contractList);
        } else {
          console.log("Get contract data failed with status:", response.status);
        }
      } catch (error) {
        console.error('Error fetching contract data:', error);
      }
    };

    fetchUserData();
    fetchContractList();
  }, []);

  const handleShowDetail = async (contractId) => {
    setSelectedContractId(contractId);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/request-contract/request-contract/get/id?id=${contractId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        credentials: 'include'
      });

      const contractDetailData = await response.json();
      if (response.status === 200) {
        setContractDetail(contractDetailData);
        setShowDetailModal(true); // Hiển thị modal khi có dữ liệu contractDetail
      } else {
        console.log("Get contract detail failed with status:", response.data);
      }
    } catch (error) {
      console.error("Error fetching contract detail:", error);
    }
  };

  const handleCloseDetail = () => {
    setContractDetail(null);
    setSelectedContractId(null);
    setShowDetailModal(false); // Đóng modal khi đóng
  };

  return (
    <>
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          {/* Section 1: User Info */}
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a href='#'>Home</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem>
                  <a href="#">User</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>

          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={userData?.avatar || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid
                  />
                  <p className="text-muted mb-1">{userData?.fullName || "Role"}</p>
                  <p className="text-muted mb-4">{userData?.address || "Address"}</p>
                  <div className="d-flex justify-content-center mb-2">
                    <MDBBtn>Follow</MDBBtn>
                    <MDBBtn outline className="ms-1">Message</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData?.fullName || "Full Name"}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{localStorage.getItem('mail') || "Email"}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Phone</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData?.phone || "Phone"}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Birthday</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData?.birthday || "Birthday"}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Gender</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{userData?.gender ? "Female" : "Male"}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>

          {/* Section 2: Contract Table */}
          <MDBRow>
            <MDBCol>
              <MDBTable align='middle'>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>No</th>
                    <th scope='col'>ComboId</th>
                    <th scope='col'>Area</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {contractData.map((contract, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{contract.comboId}</td>
                      <td>{contract.buildingDto ? contract.buildingDto.area : "-"}</td>
                      <td>
                        <MDBBadge color={contract.status ? 'success' : 'danger'} pill>
                          {contract.status ? "Active" : "Inactive"}
                        </MDBBadge>
                      </td>
                      <td>
                        <MDBBtn color='link' rounded size='sm' onClick={() => handleShowDetail(contract.requestContractId)}>
                          Detail 
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      {/* Modal Detail */}
      <DetailProfile
        contractDetail={contractDetail}
        handleCloseDetail={handleCloseDetail}
        show={showDetailModal} // Truyền prop show cho modal
      />
    </>
  );
};

export default ProfilePage;

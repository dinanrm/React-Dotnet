using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pmo.Models
{
    public class CreateChangeRequest
    {
        public int? ChangeRequestId { get; set; }
        public int? ProjectId { get; set; }
        public int? UserId { get; set; }
        public string CustomId { get; set; }
        public string ChangeRequestName { get; set; }
        public string Requester { get; set; }
        public DateTime? RaisedDate { get; set; }
        public DateTime? ApprovalReqDate { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public int? Status { get; set; }
        public List<ChangeRequestData> ChangeRequestData { get; set; }
    }
}
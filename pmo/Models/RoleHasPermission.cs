using System;
using System.Collections.Generic;

namespace pmo.Models
{
    public partial class RoleHasPermission
    {
        public RoleHasPermission()
        {
            RhpCreatedDate = DateTime.Now;
            RhpModifiedDate = DateTime.Now;
        }

        public int RhpId { get; set; }
        public int RoleId { get; set; }
        public int PermissionId { get; set; }
        public DateTime RhpCreatedDate { get; set; }
        public DateTime RhpModifiedDate { get; set; }

        public virtual Permission Permission { get; set; }
        public virtual Role Role { get; set; }
    }
}
